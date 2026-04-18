import { PredictionResult } from "../types";

export interface PredictionModel {
    homeWin: number;   // percentage 0-100
    draw: number;      // percentage 0-100
    awayWin: number;   // percentage 0-100
    predicted: PredictionResult;
    confidence: "high" | "medium" | "low";
    predictedScore: { home: number; away: number };
}