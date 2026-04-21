import { MatchModel } from "@/core/domain/models";
import { MatchStatus } from "@/core/domain/types";
import { ApiMatchData } from "../http/football-data/interfaces";
import { formatDate, formatTime } from "@/core/utils";

export class FootballDataMapper {
    static toDomain(apiMatch: ApiMatchData): MatchModel {
        return {
            id: apiMatch.id.toString(),
            league: apiMatch.competition?.name || "",
            leagueLogo: apiMatch.competition?.emblem || "",
            leagueCode: apiMatch.competition?.code || "",

            homeTeamId: apiMatch.homeTeam.id,
            awayTeamId: apiMatch.awayTeam.id,

            date: formatDate(apiMatch.utcDate),
            time: formatTime(apiMatch.utcDate),

            stadium: "Estadio",
            status: FootballDataMapper.mapStatus(apiMatch.status),

            score:
                apiMatch.score?.fullTime.home !== null
                    ? {
                        home: apiMatch.score?.fullTime.home ?? 0,
                        away: apiMatch.score?.fullTime.away ?? 0,
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
                homeWins: Math.floor(Math.random() * 10),
                draws: Math.floor(Math.random() * 8),
                awayWins: Math.floor(Math.random() * 10),
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
}