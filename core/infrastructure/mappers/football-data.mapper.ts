import { ApiMatch } from "@/core/infrastructure/http/football-data/interfaces";
import { MatchModel } from "@/core/domain/models";
import { MatchStatus } from "@/core/domain/types";

export class FootballDataMapper {
    static toDomain(apiMatch: ApiMatch): MatchModel {
        return {
            id: apiMatch.id.toString(),
            leagueId: apiMatch.competition.code.toLowerCase(),

            homeTeamId: apiMatch.homeTeam.id.toString(),
            awayTeamId: apiMatch.awayTeam.id.toString(),

            date: FootballDataMapper.formatDate(apiMatch.utcDate),
            time: FootballDataMapper.formatTime(apiMatch.utcDate),

            stadium: "Estadio",
            status: FootballDataMapper.mapStatus(apiMatch.status),

            score:
                apiMatch.score.fullTime.home !== null
                    ? {
                        home: apiMatch.score.fullTime.home,
                        away: apiMatch.score.fullTime.away ?? 0,
                    }
                    : undefined,

            homeTeam: {
                name: apiMatch.homeTeam.name,
                shortName:
                    apiMatch.homeTeam.shortName || apiMatch.homeTeam.tla,
                logoUrl: apiMatch.homeTeam.crest,
            },

            awayTeam: {
                name: apiMatch.awayTeam.name,
                shortName:
                    apiMatch.awayTeam.shortName || apiMatch.awayTeam.tla,
                logoUrl: apiMatch.awayTeam.crest,
            },

            // Valores vacíos, luego dominio los llena
            prediction: null,
            homeStats: null,
            awayStats: null,

            headToHead: {
                homeWins: 0,
                draws: 0,
                awayWins: 0,
                lastMatches: [],
            },
        };
    }

    private static mapStatus(status: string): MatchStatus {
        const map: Record<string, MatchStatus> = {
            TIMED: "upcoming",
            SCHEDULED: "upcoming",

            LIVE: "live",
            IN_PLAY: "live",
            PAUSED: "live",
            SUSPENDED: "live",

            FINISHED: "finished",
            CANCELLED: "finished",

            POSTPONED: "upcoming",
        };

        return map[status] || "upcoming";
    }

    private static formatDate(date: string): string {
        return new Date(date).toISOString().split("T")[0];
    }

    private static formatTime(date: string): string {
        return new Date(date).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }
}