import { getApiKey } from "@/core/utils";
import axios, { AxiosInstance } from "axios";
import { ApiCompetition, ApiStanding, ApiMatchData, ApiTeam } from "./interfaces";

const BASE_URL = "https://api.football-data.org/v4";


export class FootballDataApi {
    protected client: AxiosInstance;
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
}

export const footballDataApi = new FootballDataApi();
export type { ApiMatchData, ApiCompetition, ApiTeam, ApiStanding };