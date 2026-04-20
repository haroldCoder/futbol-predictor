import { useState, useEffect, useCallback } from "react";
import CacheService from "@/services/cacheService";
import { DiFactory } from "@/core/factories";
import { TeamModel } from "@/core/domain/models";

interface UseFootballApiState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useFetchTeamsApi(leagueTla: string): UseFootballApiState<TeamModel[]> {
    const [data, setData] = useState<TeamModel[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const teamRepository = DiFactory.getTeamsRepository();

    const fetchData = useCallback(async () => {
        if (!leagueTla) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const teams = await CacheService.getOrFetch(
                `team_matches_${leagueTla}`,
                () => teamRepository.getAll(leagueTla),
                60,
            );
            setData(teams);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error"));
        } finally {
            setLoading(false);
        }
    }, [leagueTla]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
