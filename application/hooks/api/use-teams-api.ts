import { useState, useEffect, useCallback } from "react";
import { footballDataApi, ApiMatchData } from "@/core/infrastructure/http/football-data";
import CacheService from "@/services/cacheService";

interface UseFootballApiState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useTeamMatchesApi(teamId: number | null): UseFootballApiState<ApiMatchData[]> {
    const [data, setData] = useState<ApiMatchData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!teamId) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const matches = await CacheService.getOrFetch(
                `team_matches_${teamId}`,
                () => footballDataApi.getTeamMatches(teamId),
                60,
            );
            setData(matches);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error"));
        } finally {
            setLoading(false);
        }
    }, [teamId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
