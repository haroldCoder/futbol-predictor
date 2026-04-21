import { useQuery } from "@tanstack/react-query";
import { DiFactory } from "@/core/factories";

export function useStandingsApi(competitionCode: string) {
    const stadingRepository = DiFactory.getStadingRepository();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["standings", competitionCode],
        queryFn: () => stadingRepository.getByLeague(competitionCode),
        enabled: !!competitionCode,
        staleTime: 1000 * 60 * 60, // 1 hora
    });

    return {
        data: data ?? [],
        loading: isLoading,
        error: error instanceof Error ? error : null,
        refetch: async () => { await refetch(); }
    };
}

export function useStandingDataWithTeams(leagueId: string | null, team1Id: number | null, team2Id: number | null) {
    const stadingRepository = DiFactory.getStadingRepository();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["standing_data", leagueId, team1Id, team2Id],
        queryFn: () => stadingRepository.getDataWithTeams(leagueId!, team1Id!, team2Id!),
        enabled: !!leagueId && !!team1Id && !!team2Id,
        staleTime: 1000 * 60 * 60,
    });

    return {
        data: data ?? null,
        loading: isLoading,
        error: error instanceof Error ? error : null,
        refetch: async () => { await refetch(); }
    };
}
