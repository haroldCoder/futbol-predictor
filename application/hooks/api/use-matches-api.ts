import { useQueries, useQuery } from "@tanstack/react-query";
import { DiFactory } from "@/core/factories";
import { MatchPredictorService } from "@/core/domain/services";
import { useMemo } from "react";
import { MatchModel } from "@/core/domain/models";

const matchRepository = DiFactory.getMatchRepository();
const standingRepository = DiFactory.getStadingRepository();

export function useTodayMatches() {
    const { data: matches, isLoading, error, refetch } = useQuery({
        queryKey: ["today_matches"],
        queryFn: () => matchRepository.getAll(),
        staleTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const enrichedMatches = useEnrichedMatches(matches ?? []);

    return {
        data: enrichedMatches,
        loading: isLoading || matches === undefined,
        error: error instanceof Error ? error : null,
        refetch: async () => { await refetch(); }
    };
}

export function useEnrichedMatches(matches: MatchModel[]) {
    // Helper para meter retraso entre peticiones y no saturar la API (Standard fix para limite de 10 req/min)
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Obtener IDs únicos de equipos y ligas para minimizar peticiones
    const uniqueTeamIds = Array.from(new Set(matches.flatMap(m => [Number(m.homeTeamId), Number(m.awayTeamId)])));
    const uniqueLeagues = Array.from(new Set(matches.map(m => m.leagueCode))).filter(Boolean);

    // 1. Estadísticas de la liga (Standings) - Una por liga única
    const leagueStandings = useQueries({
        queries: uniqueLeagues.map((leagueCode, index) => ({
            queryKey: ["standings_full", leagueCode],
            queryFn: async () => {
                await wait(index * 6500); // 6.5 segundos entre ligas para margen de seguridad
                return standingRepository.getByLeague(leagueCode);
            },
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }))
    });

    // 2. Últimos partidos por equipo - Uno por equipo único
    const teamFormResults = useQueries({
        queries: uniqueTeamIds.map((teamId, index) => ({
            queryKey: ["last_matches_form", teamId],
            queryFn: async () => {
                // Empezar después de las ligas, con 6.5 segundos entre cada petición única
                const baseDelay = uniqueLeagues.length * 6500;
                await wait(baseDelay + (index * 6500));
                return matchRepository.getLastMatches(teamId!);
            },
            staleTime: 1000 * 60 * 30,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        }))
    });

    return useMemo(() => {
        if (matches.length === 0) return [];

        // Crear mapas para acceso rápido
        const standingsMap = new Map();
        uniqueLeagues.forEach((code, idx) => {
            if (leagueStandings[idx].data) standingsMap.set(code, leagueStandings[idx].data);
        });

        const formMap = new Map();
        uniqueTeamIds.forEach((id, idx) => {
            if (teamFormResults[idx].data) formMap.set(id, teamFormResults[idx].data);
        });

        return matches.map((match) => {
            const leagueData = standingsMap.get(match.leagueCode);
            const homeForm = formMap.get(Number(match.homeTeamId));
            const awayForm = formMap.get(Number(match.awayTeamId));

            if (!homeForm || !awayForm || !leagueData) return match;

            // Extraer datos de standing para los equipos específicos del match
            const homeStandingEntry = leagueData.find((e: any) => e.teamId === Number(match.homeTeamId));
            const awayStandingEntry = leagueData.find((e: any) => e.teamId === Number(match.awayTeamId));

            if (!homeStandingEntry || !awayStandingEntry) return match;

            const standingData = {
                homeTeam: {
                    position: homeStandingEntry.position,
                    points: homeStandingEntry.points,
                    goalsFor: homeStandingEntry.goalsFor,
                    goalsAgainst: homeStandingEntry.goalsAgainst,
                    goalDifference: homeStandingEntry.goalDifference,
                    wins: homeStandingEntry.won,
                    matchesPlayed: homeStandingEntry.playedGames,
                },
                awayTeam: {
                    position: awayStandingEntry.position,
                    points: awayStandingEntry.points,
                    goalsFor: awayStandingEntry.goalsFor,
                    goalsAgainst: awayStandingEntry.goalsAgainst,
                    goalDifference: awayStandingEntry.goalDifference,
                    wins: awayStandingEntry.won,
                    matchesPlayed: awayStandingEntry.playedGames,
                }
            };

            // H2H aproximado (basado en el rendimiento individual actual del equipo)
            const h2hData = {
                wins: homeForm.resultSet.wins,
                draws: 0,
                losses: homeForm.resultSet.played - homeForm.resultSet.wins,
            };

            const clonedMatch = { ...match };

            clonedMatch.prediction = MatchPredictorService.predict(
                homeForm,
                awayForm,
                h2hData as any,
                standingData as any
            );

            clonedMatch.homeStats = {
                goalsPerGame: standingData.homeTeam.goalsFor / (standingData.homeTeam.matchesPlayed || 1),
                concededPerGame: standingData.homeTeam.goalsAgainst / (standingData.homeTeam.matchesPlayed || 1),
                possession: 50,
                form: [],
                position: standingData.homeTeam.position,
                points: standingData.homeTeam.points,
                played: standingData.homeTeam.matchesPlayed,
                wins: standingData.homeTeam.wins,
                draws: homeStandingEntry.draw || 0,
                losses: homeStandingEntry.lost || 0,
            };

            clonedMatch.awayStats = {
                goalsPerGame: standingData.awayTeam.goalsFor / (standingData.awayTeam.matchesPlayed || 1),
                concededPerGame: standingData.awayTeam.goalsAgainst / (standingData.awayTeam.matchesPlayed || 1),
                possession: 50,
                form: [],
                position: standingData.awayTeam.position,
                points: standingData.awayTeam.points,
                played: standingData.awayTeam.matchesPlayed,
                wins: standingData.awayTeam.wins,
                draws: awayStandingEntry.draw || 0,
                losses: awayStandingEntry.lost || 0,
            };

            return clonedMatch;
        });
    }, [matches, leagueStandings, teamFormResults]);
}

export function useCompetitionMatches(competitionCode: string) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["matches", competitionCode],
        queryFn: () => matchRepository.getByLeague(competitionCode),
        enabled: !!competitionCode,
        staleTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        data: data ?? null,
        loading: isLoading,
        error: error instanceof Error ? error : null,
        refetch: async () => { await refetch(); }
    };
}

export function useMatch(matchId: string) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["match", matchId],
        queryFn: () => matchRepository.getById(matchId),
        enabled: !!matchId,
        staleTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        data: data ?? null,
        loading: isLoading,
        error: error instanceof Error ? error : null,
        refetch: async () => { await refetch(); }
    };
}

export function useHeadToHead(teamId1: string | null, teamId2: string | null) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["h2h", teamId1, teamId2],
        queryFn: () => matchRepository.getHeadToHead(teamId1!, teamId2!),
        enabled: !!teamId1 && !!teamId2,
        staleTime: 1000 * 60 * 60 * 2, // 2 horas
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        data: data ?? null,
        loading: isLoading,
        error: error instanceof Error ? error : null,
        refetch: async () => { await refetch(); }
    };
}

export function useLastMatches(teamId: number | null) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["last_matches", teamId],
        queryFn: () => matchRepository.getLastMatches(teamId!),
        enabled: !!teamId,
        staleTime: 1000 * 60 * 30, // 30 minutos
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        data: data ?? null,
        loading: isLoading,
        error: error instanceof Error ? error : null,
        refetch: async () => { await refetch(); }
    };
}

export function useConfrontationHistory(team1Id: number | null, team2Id: number | null) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["confrontation_history", team1Id, team2Id],
        queryFn: () => matchRepository.getPersonalizedMatches(team1Id!, team2Id!, 10),
        enabled: !!team1Id && !!team2Id,
        staleTime: 1000 * 60 * 60 * 2, // 2 horas
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return {
        data: data ?? null,
        loading: isLoading,
        error: error instanceof Error ? error : null,
        refetch: async () => { await refetch(); }
    };
}
