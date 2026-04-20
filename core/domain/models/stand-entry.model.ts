export interface StandingEntryModel {
    position: number;
    teamId: number;
    playedGames: number;
    form: string;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    tla: string;
    shortName: string;
    emoji: string;
}
