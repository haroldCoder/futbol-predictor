import { useQuery } from "@tanstack/react-query";
import { DiFactory } from "@/core/factories";

export const useGetMatchId = (id: string) => {
    const matchRepository = DiFactory.getMatchRepository();

    return useQuery({
        queryKey: ["match", id],
        queryFn: async () => await matchRepository.getById(id),
        enabled: !!id,
    });
};