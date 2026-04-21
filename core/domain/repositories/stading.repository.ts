import { DataTeamsStadingModel, StandingEntryModel } from "../models";

export interface StadingRepository {
    getByLeague(leagueId: string): Promise<StandingEntryModel[]>;
    getDataWithTeams(leagueId: string, homeTeamId: number, awayTeamId: number): Promise<DataTeamsStadingModel>;
}