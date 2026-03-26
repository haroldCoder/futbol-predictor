import { describe, it, expect } from "vitest";
import { LEAGUES, MATCHES, TEAMS, STANDINGS } from "../data/mockData";

describe("Football Data", () => {
  it("should have leagues defined", () => {
    expect(LEAGUES.length).toBeGreaterThan(0);
    LEAGUES.forEach((league) => {
      expect(league.id).toBeTruthy();
      expect(league.name).toBeTruthy();
      expect(league.emoji).toBeTruthy();
    });
  });

  it("should have teams defined", () => {
    expect(TEAMS.length).toBeGreaterThan(0);
    TEAMS.forEach((team) => {
      expect(team.id).toBeTruthy();
      expect(team.name).toBeTruthy();
    });
  });

  it("should have matches with valid predictions", () => {
    expect(MATCHES.length).toBeGreaterThan(0);
    MATCHES.forEach((match) => {
      const { homeWin, draw, awayWin } = match.prediction;
      expect(homeWin + draw + awayWin).toBe(100);
      expect(homeWin).toBeGreaterThanOrEqual(0);
      expect(draw).toBeGreaterThanOrEqual(0);
      expect(awayWin).toBeGreaterThanOrEqual(0);
    });
  });

  it("should have a featured match", () => {
    const featured = MATCHES.find((m) => m.isFeatured);
    expect(featured).toBeDefined();
  });

  it("should have standings for Premier League", () => {
    const standings = STANDINGS["pl"];
    expect(standings).toBeDefined();
    expect(standings.length).toBeGreaterThan(0);
    standings.forEach((entry) => {
      expect(entry.points).toBeGreaterThanOrEqual(0);
      expect(entry.position).toBeGreaterThan(0);
    });
  });

  it("should have valid head to head data", () => {
    MATCHES.forEach((match) => {
      const { homeWins, draws, awayWins } = match.headToHead;
      expect(homeWins).toBeGreaterThanOrEqual(0);
      expect(draws).toBeGreaterThanOrEqual(0);
      expect(awayWins).toBeGreaterThanOrEqual(0);
    });
  });

  it("should have form data of length 5 for all teams", () => {
    MATCHES.forEach((match) => {
      expect(match.homeStats.form.length).toBe(5);
      expect(match.awayStats.form.length).toBe(5);
      match.homeStats.form.forEach((f) => {
        expect(["W", "D", "L"]).toContain(f);
      });
    });
  });
});
