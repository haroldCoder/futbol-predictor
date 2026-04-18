import { MatchStatus, PredictionResult } from "../types";
import { TeamStatsModel } from "./team-stats.model";
import { HeadToHeadModel } from "./head-to-head.model";

export interface Match {
    id: string;
    leagueId: string;
    homeTeamId: string;
    awayTeamId: string;
    date: string;       // ISO date string
    time: string;       // "HH:MM"
    stadium: string;
    status: MatchStatus;
    score?: { home: number; away: number };
    prediction: PredictionResult;
    homeStats: TeamStatsModel;
    awayStats: TeamStatsModel;
    headToHead: HeadToHeadModel;
    homeTeam?: { name: string; shortName: string; logoUrl: string };
    awayTeam?: { name: string; shortName: string; logoUrl: string };
    isFeatured?: boolean;
}