import { MatchRepository } from "@/core/domain/repositories";
import { MatchModel } from "@/core/domain/models";

import { footballDataApi } from "@/core/infrastructure/http/football-data";
import { FootballDataMapper } from "@/core/infrastructure/mappers";

export class FootballDataMatchRepositoryImpl implements MatchRepository {
    async getAll(): Promise<MatchModel[]> {
        const response = await footballDataApi.getTodayMatches();

        return response.map(FootballDataMapper.toDomain);
    }

    async getById(id: string): Promise<MatchModel | null> {
        const response = await footballDataApi.getMatch(id);

        if (!response) return null;

        return FootballDataMapper.toDomain(response);
    }

    async getByLeague(leagueId: string): Promise<MatchModel[]> {
        const response = await footballDataApi.getMatchesByCompetition(leagueId);

        return response.map(FootballDataMapper.toDomain);
    }

    async getLiveMatches(): Promise<MatchModel[]> {
        const response = await footballDataApi.getMatchesByCompetition("BL1", "LIVE");

        return response.map(FootballDataMapper.toDomain);
    }
}