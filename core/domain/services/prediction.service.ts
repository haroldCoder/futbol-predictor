import { MatchModel, PredictionModel } from "../models";

export class PredictionService {
    static generate(match: MatchModel): PredictionModel {
        const seed =
            (Number(match.homeTeamId) + Number(match.awayTeamId)) % 100;

        let homeWin = 0;
        let draw = 0;
        let awayWin = 0;

        if (seed < 40) {
            homeWin = 55;
            draw = 25;
            awayWin = 20;
        } else if (seed < 70) {
            homeWin = 35;
            draw = 30;
            awayWin = 35;
        } else {
            homeWin = 20;
            draw = 25;
            awayWin = 55;
        }

        const predicted =
            homeWin > awayWin && homeWin > draw
                ? "home"
                : awayWin > homeWin && awayWin > draw
                    ? "away"
                    : "draw";

        return {
            homeWin,
            draw,
            awayWin,
            predicted,
            confidence: "medium",
            predictedScore: {
                home: 1,
                away: 0,
            },
        };
    }
}