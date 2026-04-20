import { ApiMatchData, FootballDataApi } from "./football-data.api";

export class ApiMatchesService extends FootballDataApi {
    constructor() {
        super();
    }

    /**
     * Obtener partidos de hoy
     */
    async getTodayMatches(): Promise<ApiMatchData[]> {
        try {
            const response = await this.client.get("/matches", {
                params: {
                    status: "SCHEDULED,LIVE,IN_PLAY,FINISHED",
                },
            });

            return response.data.matches || [];
        } catch (error) {
            console.error("Error fetching today's matches:", error);
            throw error;
        }
    }

    /**
     * Obtener detalles de un partido específico
     */
    async getMatch(matchId: string): Promise<ApiMatchData> {
        try {
            const response = await this.client.get(`/matches/${matchId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching match ${matchId}:`, error);
            throw error;
        }
    }

    /**
     * Obtener enfrentamientos históricos entre dos equipos
     */
    async getHeadToHead(teamId1: string, teamId2: string): Promise<ApiMatchData[]> {
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