import { TeamModel } from "../models";

export interface TeamRepository {
    getAll(): Promise<TeamModel[]>;
    getById(id: string): Promise<TeamModel | null>;
    getByLeague(leagueId: string): Promise<TeamModel[]>;
}