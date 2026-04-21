import { ConfrontationHistoryModel, DataTeamsStadingModel, LastMatchesModel, PredictionModel } from "../models";
import { PredictionResult } from "../types";

export class MatchPredictorService {
    /**
     * Predice los porcentajes de victoria, empate y derrota, así como un marcador probable.
     * Retorna un objeto compatible con PredictionModel.
     */
    static predict(
        lastMatchesHome: LastMatchesModel,
        lastMatchesAway: LastMatchesModel,
        h2h: ConfrontationHistoryModel,
        standing: DataTeamsStadingModel
    ): PredictionModel {
        const homeWinProb = this.calculatePercentage(lastMatchesHome, lastMatchesAway, h2h, standing, "home");
        const awayWinProb = this.calculatePercentage(lastMatchesHome, lastMatchesAway, h2h, standing, "away");

        // El resto es para el empate, asegurando que sumen 100
        const drawProb = Math.max(0, 100 - homeWinProb - awayWinProb);

        const homeWinRounded = Math.round(homeWinProb);
        const awayWinRounded = Math.round(awayWinProb);
        const drawRounded = Math.round(drawProb);

        const score = this.calculateScore(standing);
        const predicted = this.determinePredicted(homeWinRounded, drawRounded, awayWinRounded);
        const confidence = this.determineConfidence(homeWinRounded, drawRounded, awayWinRounded);

        return {
            homeWin: homeWinRounded,
            draw: drawRounded,
            awayWin: awayWinRounded,
            predicted,
            confidence,
            predictedScore: {
                home: score.home,
                away: score.away,
            },
        };
    }

    private static calculatePercentage(
        lastMatchesHome: LastMatchesModel,
        lastMatchesAway: LastMatchesModel,
        h2h: ConfrontationHistoryModel,
        standing: DataTeamsStadingModel,
        side: "home" | "away"
    ): number {
        // Pesos
        const FORM_WEIGHT = 0.4;
        const H2H_WEIGHT = 0.3;
        const STANDING_WEIGHT = 0.3;

        // 1. Form (Basado en victorias en últimos partidos)
        const homeWins = lastMatchesHome.resultSet.wins / (lastMatchesHome.resultSet.played || 1);
        const awayWins = lastMatchesAway.resultSet.wins / (lastMatchesAway.resultSet.played || 1);

        let formScore = 0.5; // Base neutral
        if (side === "home") {
            formScore = homeWins / (homeWins + awayWins || 1);
        } else {
            formScore = awayWins / (homeWins + awayWins || 1);
        }

        // 2. H2H
        const totalH2H = h2h.wins + h2h.draws + h2h.losses;
        let h2hScore = 0.5;
        if (totalH2H > 0) {
            if (side === "home") {
                h2hScore = (h2h.wins + h2h.draws * 0.5) / totalH2H;
            } else {
                h2hScore = (h2h.losses + h2h.draws * 0.5) / totalH2H;
            }
        }

        // 3. Standing (Puntos por partido)
        const homePPM = standing.homeTeam.points / (standing.homeTeam.matchesPlayed || 1);
        const awayPPM = standing.awayTeam.points / (standing.awayTeam.matchesPlayed || 1);

        let standingScore = 0.5;
        if (side === "home") {
            standingScore = homePPM / (homePPM + awayPPM || 1);
        } else {
            standingScore = awayPPM / (homePPM + awayPPM || 1);
        }

        // Combinar con pesos
        const finalProb = (formScore * FORM_WEIGHT + h2hScore * H2H_WEIGHT + standingScore * STANDING_WEIGHT) * 100;

        return Math.min(Math.max(finalProb, 5), 90); // Limitar entre 5% y 90%
    }

    private static calculateScore(
        standing: DataTeamsStadingModel
    ): { home: number; away: number } {
        // Promedio de goles anotados y recibidos en la temporada
        const homeAvgScored = standing.homeTeam.goalsFor / (standing.homeTeam.matchesPlayed || 1);
        const homeAvgConceded = standing.homeTeam.goalsAgainst / (standing.homeTeam.matchesPlayed || 1);

        const awayAvgScored = standing.awayTeam.goalsFor / (standing.awayTeam.matchesPlayed || 1);
        const awayAvgConceded = standing.awayTeam.goalsAgainst / (standing.awayTeam.matchesPlayed || 1);

        // Expectativa de goles
        const homeExpectation = (homeAvgScored + awayAvgConceded) / 2;
        const awayExpectation = (awayAvgScored + homeAvgConceded) / 2;

        return {
            home: Math.round(homeExpectation),
            away: Math.round(awayExpectation),
        };
    }

    private static determinePredicted(home: number, draw: number, away: number): PredictionResult {
        if (home >= draw && home >= away) return "home";
        if (away >= home && away >= draw) return "away";
        return "draw";
    }

    private static determineConfidence(home: number, draw: number, away: number): "high" | "medium" | "low" {
        const probs = [home, draw, away].sort((a, b) => b - a);
        const diff = probs[0] - probs[1];

        if (diff > 20) return "high";
        if (diff > 10) return "medium";
        return "low";
    }
}
