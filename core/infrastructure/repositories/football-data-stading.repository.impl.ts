import { StadingRepository } from "@/core/domain/repositories";
import { DataTeamsStadingModel, StandingEntryModel } from "@/core/domain/models";
import { ApiStanding, ApiStandingsService } from "../http/football-data";
import { FootballDataStadingTeamsMapper } from "../mappers";

export class FootballDataStadingRepositoryImpl implements StadingRepository {
    private stadingService: ApiStandingsService;

    constructor() {
        this.stadingService = new ApiStandingsService();
    }

    async getByLeague(leagueId: string): Promise<StandingEntryModel[]> {
        const response: ApiStanding | null = await this.stadingService.getStandings(leagueId);

        return response?.standings[0].table.map((entry) => ({
            ...entry,
            teamId: entry.team.id,
            tla: entry.team.tla,
            shortName: entry.team.shortName,
            emoji: entry.team.crest
        })) ?? [];
    }

    async getDataWithTeams(leagueId: string, homeTeamId: number, awayTeamId: number): Promise<DataTeamsStadingModel> {
        const response: ApiStanding | null = await this.stadingService.getStandings(leagueId);

        const homeTeam = response?.standings[0].table.find((entry) => entry.team.id === homeTeamId);
        const awayTeam = response?.standings[0].table.find((entry) => entry.team.id === awayTeamId);

        return FootballDataStadingTeamsMapper.toDomain(homeTeam, awayTeam);
    }
}