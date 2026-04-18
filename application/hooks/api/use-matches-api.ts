import { useState, useEffect, useCallback } from "react";
import { footballDataApi, ApiMatch } from "@/services/footballDataApi";
import CacheService from "@/services/cacheService";

interface UseFootballApiState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useTodayMatches(): UseFootballApiState<ApiMatch[]> {
    const [data, setData] = useState<ApiMatch[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const matches = await CacheService.getOrFetch(
                "today_matches",
                () => footballDataApi.getTodayMatches(),
                15, // Cache por 15 minutos
            );
            setData(matches);
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

export function useCompetitionMatches(competitionCode: string): UseFootballApiState<ApiMatch[]> {
    const [data, setData] = useState<ApiMatch[] | null>(null);
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
            const matches = await CacheService.getOrFetch(
                `matches_${competitionCode}`,
                () => footballDataApi.getMatchesByCompetition(competitionCode),
                15,
            );
            setData(matches);
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

export function useMatch(matchId: string): UseFootballApiState<ApiMatch> {
    const [data, setData] = useState<ApiMatch | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!matchId) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const match = await CacheService.getOrFetch(
                `match_${matchId}`,
                () => footballDataApi.getMatch(matchId),
                15,
            );
            setData(match);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error"));
        } finally {
            setLoading(false);
        }
    }, [matchId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

export function useHeadToHead(teamId1: number | null, teamId2: number | null): UseFootballApiState<ApiMatch[]> {
    const [data, setData] = useState<ApiMatch[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (!teamId1 || !teamId2) {
            setData(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const matches = await CacheService.getOrFetch(
                `h2h_${teamId1}_${teamId2}`,
                () => footballDataApi.getHeadToHead(teamId1, teamId2),
                120, // Cache por 2 horas
            );
            setData(matches);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error"));
        } finally {
            setLoading(false);
        }
    }, [teamId1, teamId2]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
