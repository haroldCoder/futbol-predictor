import { ApiCompetition } from "./api-competition.interface";
import { ApiTeam } from "./api-team.interface";

export interface ApiMatchData {
    id: number;
    utcDate: string;
    status: "TIMED" | "LIVE" | "IN_PLAY" | "PAUSED" | "FINISHED" | "POSTPONED" | "CANCELLED" | "SUSPENDED";
    stage: string;
    group: string | null;
    lastUpdated: string;
    homeTeam: ApiTeam;
    awayTeam: ApiTeam;
    score: {
        winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null;
        duration: string;
        fullTime: { home: number | null; away: number | null };
        halfTime: { home: number | null; away: number | null };
    };
    competition: ApiCompetition;
    season: { id: number; startDate: string; endDate: string; currentMatchday: number };
    referees: Array<{ id: number; name: string; type: string }>;
}