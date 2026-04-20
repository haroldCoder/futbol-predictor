import { AxiosResponse } from "axios";
import { ApiTeam, FootballDataApi } from "./football-data.api";

export class ApiTeamsService extends FootballDataApi {
    constructor() {
        super();
    }

    /**
     * Obtener detalles de un equipo
     */
    async getTeam(teamId: number): Promise<any> {
        try {
            const response = await this.client.get(`/teams/${teamId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching team ${teamId}:`, error);
            throw error;
        }
    }

    /**
         * Obtener equipos de una competición específica
         */
    async getTeamsByCompetition(tla: string): Promise<ApiTeam[]> {
        try {
            const response: AxiosResponse<ApiTeam[]> = await this.client.get(`/competitions/${tla}/teams`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching teams for competition ${tla}:`, error);
            throw error;
        }
    }
}