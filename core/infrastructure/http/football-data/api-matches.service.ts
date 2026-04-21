import { ApiMatchData, FootballDataApi } from "./football-data.api";
import { ApiConfrontationHistory, ApiLastMatchesData } from "./interfaces";

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

    /**
     * Obtener ultimos 10 enfrentamientos de un equipo
     */
    async getLastMatches(teamId: number): Promise<ApiLastMatchesData> {
        try {
            const response = await this.client.get(`/teams/${teamId}/matches`, {
                params: {
                    status: "FINISHED",
                    limit: 10,
                },
            });
            return response.data.matches || [];
        } catch (error) {
            console.error(`Error fetching last 10 matches for ${teamId}:`, error);
            throw error;
        }
    }

    async getPersonalizedMatches(teamMainId: number, teamSecondId: number, limit: number): Promise<ApiConfrontationHistory> {
        try {
            const response = await this.client.get(`/teams/${teamMainId}/matches`, {
                params: {
                    status: "FINISHED",
                    limit
                },
            });

            const matches: ApiLastMatchesData[] = response.data || [];

            let wins = 0;
            let draws = 0;
            let losses = 0;

            matches.forEach((match) => {
                match.matches.map((match) => {
                    const isHome = match.homeTeam.id === teamMainId;

                    const teamGoals = isHome
                        ? match.score.home
                        : match.score.away;

                    const rivalGoals = isHome
                        ? match.score.away
                        : match.score.home;

                    if (teamGoals > rivalGoals) {
                        wins++;
                    } else if (teamGoals === rivalGoals) {
                        draws++;
                    } else {
                        losses++;
                    }
                });
            });

            return {
                wins,
                draws,
                losses,
            }
        } catch (error) {
            console.error(`Error fetching last ${limit} matches for ${teamMainId} vs ${teamSecondId}:`, error);
            throw error;
        }
    }
}