import { TeamModel } from "../models";

export interface TeamRepository {
    getAll(leagueTla: string): Promise<TeamModel[]>;
    getById(id: string): Promise<TeamModel | null>;
}