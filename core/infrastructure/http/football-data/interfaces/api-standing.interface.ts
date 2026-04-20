import { ApiTeam } from "./api-team.interface";

export interface ApiStanding {
    standings: Array<{
        stage: string;
        type: string;
        group: string | null;
        table: Array<{
            team: ApiTeam;
            position: number;
            playedGames: number;
            form: string;
            won: number;
            draw: number;
            lost: number;
            points: number;
            goalsFor: number;
            goalsAgainst: number;
            goalDifference: number;
        }>;
    }>;
}