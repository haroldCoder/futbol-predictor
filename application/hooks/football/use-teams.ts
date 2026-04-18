import { useMemo } from "react";
import { TEAMS } from "@/data/mockData";
import { TeamModel } from "@/core/domain/models";

export function useTeams() {
    const teams = useMemo(() => TEAMS, []);

    const getTeam = (id: string): TeamModel | undefined =>
        teams.find((t) => t.id === id);

    return { teams, getTeam };
}
