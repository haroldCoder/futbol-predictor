import { MatchModel } from "@/core/domain/models";

export interface MatchRepository {
    getAll(): Promise<MatchModel[]>;
    getById(id: string): Promise<MatchModel | null>;
    getByLeague(leagueId: string): Promise<MatchModel[]>;
    getLiveMatches(): Promise<MatchModel[]>;
    getHeadToHead(teamId1: string, teamId2: string): Promise<MatchModel[]>;
}