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
            const response = await this.client.get(`/competitions/${competitionCode}/standings`);
            return response.data.standings?.[0] || null;
        } catch (error) {
            console.error(`Error fetching standings for ${competitionCode}:`, error);
            throw error;
        }
    }
}