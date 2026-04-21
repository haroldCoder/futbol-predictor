import { MatchStatus } from "../types";
import { TeamStatsModel } from "./team-stats.model";
import { HeadToHeadModel } from "./head-to-head.model";
import { PredictionModel } from "./prediction.model";

export interface MatchModel {
    id: string;
    league: string;
    leagueLogo: string;
    homeTeamId: string;
    awayTeamId: string;
    date: string;       // ISO date string
    time: string;       // "HH:MM"
    stadium: string;
    status: MatchStatus;
    score?: { home: number; away: number };
    prediction: PredictionModel | null;
    homeStats: TeamStatsModel | null;
    awayStats: TeamStatsModel | null;
    headToHead: HeadToHeadModel | null;
    homeTeam?: { name: string; shortName: string; logoUrl: string };
    awayTeam?: { name: string; shortName: string; logoUrl: string };
    isFeatured?: boolean;
}