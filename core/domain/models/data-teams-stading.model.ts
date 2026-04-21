export interface DataTeamsStadingModel {
    homeTeam: {
        position: number;
        points: number;
        goalsFor: number;
        goalsAgainst: number;
        goalDifference: number;
        wins: number;
        matchesPlayed: number;
    },
    awayTeam: {
        position: number;
        points: number;
        goalsFor: number;
        goalsAgainst: number;
        goalDifference: number;
        wins: number;
        matchesPlayed: number;
    }
}