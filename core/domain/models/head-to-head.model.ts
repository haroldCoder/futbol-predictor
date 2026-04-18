export interface HeadToHeadModel {
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