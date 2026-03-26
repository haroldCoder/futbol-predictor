import { useState, useEffect, useCallback } from "react";
import { footballDataApi, ApiMatch, ApiCompetition } from "@/services/footballDataApi";
import CacheService from "@/services/cacheService";

interface UseFootballApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook para obtener competiciones con caché
 */
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

/**
 * Hook para obtener partidos de hoy con caché
 */
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
        15, // Cache por 15 minutos (datos más frescos)
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

/**
 * Hook para obtener partidos de una competición específica
 */
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

/**
 * Hook para obtener tabla de posiciones
 */
export function useStandings(competitionCode: string): UseFootballApiState<any> {
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

/**
 * Hook para obtener partidos de un equipo
 */
export function useTeamMatches(teamId: number | null): UseFootballApiState<ApiMatch[]> {
  const [data, setData] = useState<ApiMatch[] | null>(null);
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

/**
 * Hook para obtener enfrentamientos históricos
 */
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
