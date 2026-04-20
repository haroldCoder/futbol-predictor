import { StandingEntryModel } from "../models";

export interface StadingRepository {
    getByLeague(leagueId: string): Promise<StandingEntryModel[]>;
}