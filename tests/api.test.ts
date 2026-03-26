import { describe, it, expect, beforeAll } from "vitest";
import { footballDataApi } from "../services/footballDataApi";

describe("Football Data API", () => {
  it("should have API key configured", () => {
    const apiKey = process.env.EXPO_PUBLIC_FOOTBALL_DATA_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey?.length).toBeGreaterThan(0);
  });

  it("should fetch competitions successfully", async () => {
    try {
      const competitions = await footballDataApi.getCompetitions();
      expect(Array.isArray(competitions)).toBe(true);
      expect(competitions.length).toBeGreaterThan(0);
      
      // Verify structure
      const competition = competitions[0];
      expect(competition.id).toBeDefined();
      expect(competition.name).toBeDefined();
      expect(competition.code).toBeDefined();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  });

  it("should fetch today's matches", async () => {
    try {
      const matches = await footballDataApi.getTodayMatches();
      expect(Array.isArray(matches)).toBe(true);
      
      // Matches might be empty, but structure should be valid
      if (matches.length > 0) {
        const match = matches[0];
        expect(match.id).toBeDefined();
        expect(match.homeTeam).toBeDefined();
        expect(match.awayTeam).toBeDefined();
        expect(match.status).toBeDefined();
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  });

  it("should fetch standings for Premier League", async () => {
    try {
      const standings = await footballDataApi.getStandings("PL");
      expect(standings).toBeDefined();
      
      if (standings) {
        expect(standings.table).toBeDefined();
        expect(Array.isArray(standings.table)).toBe(true);
        expect(standings.table.length).toBeGreaterThan(0);
        
        const entry = standings.table[0];
        expect(entry.position).toBeDefined();
        expect(entry.team).toBeDefined();
        expect(entry.points).toBeDefined();
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  });
});
