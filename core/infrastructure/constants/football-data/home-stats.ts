import { FormResult } from "@/core/domain/types";

export const homeStats = {
    goalsPerGame: 1.8 + Math.random() * 1.2,
    concededPerGame: 0.8 + Math.random() * 0.6,
    possession: 50 + Math.random() * 20,
    form: ["W", "W", "D", "W", "L"] as FormResult[],
    position: Math.floor(Math.random() * 20) + 1,
    points: Math.floor(Math.random() * 60) + 20,
    played: 25 + Math.floor(Math.random() * 10),
    wins: Math.floor(Math.random() * 20),
    draws: Math.floor(Math.random() * 10),
    losses: Math.floor(Math.random() * 10),
};