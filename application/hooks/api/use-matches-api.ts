import { useQuery } from "@tanstack/react-query";
import { DiFactory } from "@/core/factories";
import { useEnrichedMatches } from "./use-enriched-matches";

const matchRepository = DiFactory.getMatchRepository();

export function useTodayMatches() {
    const { data: matches, isLoading, error, refetch } = useQuery({
        queryKey: ["today_matches"],
        queryFn: () => matchRepository.getAll(),
        staleTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const { data: enrichedMatches, isLoading: predictionsLoading } = useEnrichedMatches(matches ?? []);

    return {
        data: enrichedMatches,
        loading: isLoading || matches === undefined,
        predictionsLoading,
        error: error instanceof Error ? error : null,
        refetch: async () => { await refetch(); }
    };
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
