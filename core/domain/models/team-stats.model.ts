import { FormResult } from "../types";

export interface TeamStatsModel {
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