import { useQuery } from "@tanstack/react-query";
import { ApiCompetitionsService } from "@/core/infrastructure/http/football-data";

const competitionsService = new ApiCompetitionsService();

export function useCompetitions() {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["competitions"],
        queryFn: () => competitionsService.getCompetitions(),
        staleTime: 1000 * 60 * 60, // 1 hora
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
