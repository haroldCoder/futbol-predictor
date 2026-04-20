import { StadingRepository } from "@/core/domain/repositories";
import { StandingEntryModel } from "@/core/domain/models";
import { ApiStandingsService } from "../http/football-data";
import { FootballDataMapper } from "../mappers";

export class FootballDataStadingRepositoryImpl implements StadingRepository {
    private stadingService: ApiStandingsService;

    constructor() {
        this.stadingService = new ApiStandingsService();
    }

    async getByLeague(leagueId: string): Promise<StandingEntryModel[]> {
        const response = await this.stadingService.getStandings(leagueId);

        return response?.table.map((entry) => ({ ...entry, team: entry.team.id })) ?? [];
    }
}