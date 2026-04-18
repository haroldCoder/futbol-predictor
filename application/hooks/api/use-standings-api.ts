import { useState, useEffect, useCallback } from "react";
import { footballDataApi } from "@/services/footballDataApi";
import CacheService from "@/services/cacheService";

interface UseFootballApiState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useStandingsApi(competitionCode: string): UseFootballApiState<any> {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!competitionCode) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const standings = await CacheService.getOrFetch(
                `standings_${competitionCode}`,
                () => footballDataApi.getStandings(competitionCode),
                60, // Cache por 1 hora
            );
            setData(standings);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error"));
        } finally {
            setLoading(false);
        }
    }, [competitionCode]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
