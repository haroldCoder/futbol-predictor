import { AxiosResponse } from "axios";
import { ApiStanding, FootballDataApi } from "./football-data.api";

export class ApiStandingsService extends FootballDataApi {
    constructor() {
        super();
    }

    /**
     * Obtener tabla de posiciones de una competición
     */
    async getStandings(competitionCode: string): Promise<ApiStanding | null> {
        try {
            const response: AxiosResponse<ApiStanding> = await this.client.get(`/competitions/${competitionCode}/standings`);
            return response.data || null;
        } catch (error) {
            console.error(`Error fetching standings for ${competitionCode}:`, error);
            throw error;
        }
    }
}