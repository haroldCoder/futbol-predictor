import { MatchModel } from "@/core/domain/models";

export interface MatchRepository {
    getAll(): Promise<MatchModel[]>;
    getById(id: string): Promise<MatchModel | null>;
    getByLeague(leagueId: string): Promise<MatchModel[]>;
    getLiveMatches(): Promise<MatchModel[]>;
}