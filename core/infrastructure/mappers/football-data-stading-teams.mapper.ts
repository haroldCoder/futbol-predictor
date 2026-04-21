import { DataTeamsStadingModel } from "@/core/domain/models";
import { ApiStadingTeam } from "../http/football-data/interfaces";

export class FootballDataStadingTeamsMapper {
    static toDomain(homeTeam: ApiStadingTeam | undefined, awayTeam: ApiStadingTeam | undefined): DataTeamsStadingModel {
        return {
            homeTeam: {
                position: homeTeam?.position ?? 0,
                points: homeTeam?.points ?? 0,
                goalsFor: homeTeam?.goalsFor ?? 0,
                goalsAgainst: homeTeam?.goalsAgainst ?? 0,
                goalDifference: homeTeam?.goalDifference ?? 0,
                wins: homeTeam?.won ?? 0,
                matchesPlayed: homeTeam?.playedGames ?? 0,
            },
            awayTeam: {
                position: awayTeam?.position ?? 0,
                points: awayTeam?.points ?? 0,
                goalsFor: awayTeam?.goalsFor ?? 0,
                goalsAgainst: awayTeam?.goalsAgainst ?? 0,
                goalDifference: awayTeam?.goalDifference ?? 0,
                wins: awayTeam?.won ?? 0,
                matchesPlayed: awayTeam?.playedGames ?? 0,
            },
        };
    }
}