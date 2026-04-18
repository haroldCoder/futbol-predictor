import { ApiTeam } from "./api-team.interface";
import { ApiCompetition } from "./api-competition.interface";

export interface ApiMatch {
    id: number;
    utcDate: string;
    status: string;

    homeTeam: ApiTeam;
    awayTeam: ApiTeam;
    competition: ApiCompetition;

    score: {
        fullTime: {
            home: number | null;
            away: number | null;
        };
    };
}