import { useQuery } from "@tanstack/react-query";
import { DiFactory } from "@/core/factories";
import { MatchModel } from "@/core/domain/models";

const matchRepository = DiFactory.getMatchRepository();

export function useTodayMatches() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["today_matches"],
        queryFn: () => matchRepository.getAll(),
        staleTime: 1000 * 60 * 15, // 15 minutos
    });

    return {
        data: data ?? null,
        loading: isLoading,
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
    });

    return {
        data: data ?? null,
        loading: isLoading,
        error: error instanceof Error ? error : null,
        refetch: async () => { await refetch(); }
    };
}
