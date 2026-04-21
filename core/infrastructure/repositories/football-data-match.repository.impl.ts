import { MatchRepository } from "@/core/domain/repositories";
import { ConfrontationHistoryModel, LastMatchesModel, MatchModel } from "@/core/domain/models";
import { FootballDataMapper } from "@/core/infrastructure/mappers";
import { ApiCompetitionsService, ApiMatchesService } from "../http/football-data";

export class FootballDataMatchRepositoryImpl implements MatchRepository {
    private matchesService: ApiMatchesService;
    private competitionsService: ApiCompetitionsService;

    constructor() {
        this.matchesService = new ApiMatchesService();
        this.competitionsService = new ApiCompetitionsService();
    }

    async getAll(): Promise<MatchModel[]> {
        const response = await this.matchesService.getTodayMatches();
        return response.map(FootballDataMapper.toDomain);
    }

    async getById(id: string): Promise<MatchModel | null> {
        const response = await this.matchesService.getMatch(id);

        if (!response) return null;

        return FootballDataMapper.toDomain(response);
    }

    async getByLeague(leagueId: string): Promise<MatchModel[]> {
        const response = await this.competitionsService.getMatchesByCompetition(leagueId);

        return response.map(FootballDataMapper.toDomain);
    }

    async getLiveMatches(): Promise<MatchModel[]> {
        const response = await this.competitionsService.getMatchesByCompetition("BL1", "LIVE");

        return response.map(FootballDataMapper.toDomain);
    }

    async getHeadToHead(teamId1: string, teamId2: string): Promise<MatchModel[]> {
        const response = await this.matchesService.getHeadToHead(teamId1, teamId2);

        return response.map(FootballDataMapper.toDomain);
    }

    async getLastMatches(teamId: number): Promise<LastMatchesModel> {
        const response = await this.matchesService.getLastMatches(teamId);

        return response;
    }

    async getPersonalizedMatches(teamMainId: number, teamSecondId: number, limit: number): Promise<ConfrontationHistoryModel> {
        const response = await this.matchesService.getPersonalizedMatches(teamMainId, teamSecondId, limit);

        return response;
    }
}