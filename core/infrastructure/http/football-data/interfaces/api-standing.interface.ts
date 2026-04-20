import { ApiTeam } from "./api-team.interface";

export interface ApiStanding {
    stage: string;
    type: string;
    group: string | null;
    table: Array<{
        position: number;
        team: ApiTeam;
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
}