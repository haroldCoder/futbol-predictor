import { getApiKey } from "@/core/utils";
import axios, { AxiosInstance } from "axios";
import { ApiCompetition, ApiStanding, ApiMatchData, ApiTeam } from "./interfaces";

const BASE_URL = "https://api.football-data.org/v4";


class FootballDataApi {
    private client: AxiosInstance;
    private apiKey: string;

    constructor() {
        this.apiKey = getApiKey();
        this.client = axios.create({
            baseURL: BASE_URL,
            headers: {
                "X-Auth-Token": this.apiKey,
            },
        });

        // Agregar interceptor para loguear errores
        this.client.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    console.error("Football Data API: Authentication failed. Check your API key.");
                }
                return Promise.reject(error);
            },
        );
    }

    /**
     * Obtener todas las competiciones disponibles
     */
    async getCompetitions(): Promise<ApiCompetition[]> {
        try {
            const response = await this.client.get("/competitions");
            return response.data.competitions || [];
        } catch (error) {
            console.error("Error fetching competitions:", error);
            throw error;
        }
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
}

export const footballDataApi = new FootballDataApi();
export type { ApiMatchData, ApiCompetition, ApiTeam, ApiStanding };