import { ApiMatchData, FootballDataApi } from "./football-data.api";

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
         * Obtener partidos de un equipo específico
         */
    async getTeamMatches(teamId: number, limit: number = 10): Promise<ApiMatchData[]> {
        try {
            const response = await this.client.get(`/teams/${teamId}/matches`, {
                params: {
                    limit,
                    status: "FINISHED",
                },
            });
            return response.data.matches || [];
        } catch (error) {
            console.error(`Error fetching matches for team ${teamId}:`, error);
            throw error;
        }
    }

    /**
     * Obtener enfrentamientos históricos entre dos equipos
     */
    async getHeadToHead(teamId1: number, teamId2: number): Promise<ApiMatchData[]> {
        try {
            const response = await this.client.get(`/teams/${teamId1}/matches`, {
                params: {
                    against: teamId2,
                    status: "FINISHED",
                    limit: 20,
                },
            });
            return response.data.matches || [];
        } catch (error) {
            console.error(`Error fetching head to head for ${teamId1} vs ${teamId2}:`, error);
            throw error;
        }
    }
}