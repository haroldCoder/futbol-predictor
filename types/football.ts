export type MatchStatus = "upcoming" | "live" | "finished";
export type PredictionResult = "home" | "draw" | "away";
export type FormResult = "W" | "D" | "L";

export interface League {
  id: string;
  name: string;
  shortName: string;
  country: string;
  emoji: string;
  color: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  emoji: string;
  color: string;
  leagueId: string;
}

export interface Prediction {
  homeWin: number;   // percentage 0-100
  draw: number;      // percentage 0-100
  awayWin: number;   // percentage 0-100
  predicted: PredictionResult;
  confidence: "high" | "medium" | "low";
  predictedScore: { home: number; away: number };
}

export interface HeadToHead {
  homeWins: number;
  draws: number;
  awayWins: number;
  lastMatches: {
    date: string;
    homeScore: number;
    awayScore: number;
    homeTeamId: string;
    awayTeamId: string;
  }[];
}

export interface TeamStats {
  goalsPerGame: number;
  concededPerGame: number;
  possession: number;
  form: FormResult[];  // last 5 matches
  position: number;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
}

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
  prediction: Prediction;
  homeStats: TeamStats;
  awayStats: TeamStats;
  headToHead: HeadToHead;
  homeTeam?: { name: string; shortName: string; logoUrl: string };
  awayTeam?: { name: string; shortName: string; logoUrl: string };
  isFeatured?: boolean;
}

export interface StandingEntry {
  position: number;
  teamId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}
