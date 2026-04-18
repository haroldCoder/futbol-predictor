import { useMemo } from "react";
import { LEAGUES } from "@/data/mockData";
import { LeagueModel } from "@/core/domain/models";

export function useLeagues() {
    const leagues = useMemo(() => LEAGUES, []);

    const getLeague = (id: string): LeagueModel | undefined =>
        leagues.find((l) => l.id === id);

    return { leagues, getLeague };
}
