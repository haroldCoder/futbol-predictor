import { useState, useEffect, useCallback } from "react";
import { footballDataApi, ApiCompetition } from "@/core/infrastructure/http/football-data";
import CacheService from "@/services/cacheService";

interface UseFootballApiState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useCompetitions(): UseFootballApiState<ApiCompetition[]> {
    const [data, setData] = useState<ApiCompetition[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const competitions = await CacheService.getOrFetch(
                "competitions",
                () => footballDataApi.getCompetitions(),
                60, // Cache por 1 hora
            );
            setData(competitions);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error"));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
