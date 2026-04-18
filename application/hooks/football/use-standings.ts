import { STANDINGS } from "@/data/mockData";
import { StandingEntryModel } from "@/core/domain/models";

export function useStandingsMock() {
    const getStandings = (leagueId: string): StandingEntryModel[] =>
        STANDINGS[leagueId] ?? [];

    return { getStandings };
}
