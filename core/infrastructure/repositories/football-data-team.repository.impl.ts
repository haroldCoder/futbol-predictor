import { TeamRepository } from "@/core/domain/repositories";
import { TeamModel } from "@/core/domain/models";
import { ApiTeam, ApiTeamsService } from "../http/football-data";

export class FootballDataTeamRepositoryImpl implements TeamRepository {
    private apiTeamsService: ApiTeamsService;

    constructor() {
        this.apiTeamsService = new ApiTeamsService();
    }

    async getAll(leagueTla: string): Promise<TeamModel[]> {
        const response: ApiTeam[] = await this.apiTeamsService.getTeamsByCompetition(leagueTla);
        return response.map((team) => ({
            ...team,
            emoji: team.crest,
            color: team.clubColors,
            country: team.area.name
        }));
    }
    getById(id: string): Promise<TeamModel | null> {
        throw new Error("Method not implemented.");
    }
}