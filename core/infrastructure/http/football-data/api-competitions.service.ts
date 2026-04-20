import { ApiCompetition, ApiMatchData, FootballDataApi } from "./football-data.api";

export class ApiCompetitionsService extends FootballDataApi {
    constructor() {
        super();
    }

    /**
     * Obtener todas las competiciones
     */
    async getCompetitions(): Promise<ApiCompetition[]> {
        const response = await this.client.get("/competitions");
        return response.data.competitions;
    }

    /**
        * Obtener partidos de una competición específica
        */
    async getMatchesByCompetition(competitionCode: string, status?: string): Promise<ApiMatchData[]> {
        try {
            const params: any = {};
            if (status) params.status = status;

            const response = await this.client.get(`/competitions/${competitionCode}/matches`, { params });
            return response.data.matches || [];
        } catch (error) {
            console.error(`Error fetching matches for ${competitionCode}:`, error);
            throw error;
        }
    }
}