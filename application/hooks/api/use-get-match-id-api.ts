import { useQuery } from "@tanstack/react-query";
import { DiFactory } from "@/core/factories";
import { MatchPredictorService } from "@/core/domain/services";
import { useMemo } from "react";
import { useLastMatches, useConfrontationHistory } from "./use-matches-api";
import { useStandingDataWithTeams } from "./use-standings-api";

export const useGetMatchId = (id: string) => {
    const matchRepository = DiFactory.getMatchRepository();

    const { data: match, isLoading: isMatchLoading, error: matchError, refetch } = useQuery({
        queryKey: ["match", id],
        queryFn: () => matchRepository.getById(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const homeId = match ? Number(match.homeTeamId) : null;
    const awayId = match ? Number(match.awayTeamId) : null;

    const { data: lastHome, loading: isLastHomeLoading } = useLastMatches(homeId);
    const { data: lastAway, loading: isLastAwayLoading } = useLastMatches(awayId);
    const { data: h2h, loading: isH2hLoading } = useConfrontationHistory(homeId, awayId);
    const { data: standing, loading: isStandingLoading } = useStandingDataWithTeams(match?.leagueCode ?? "", homeId, awayId);

    const enrichedMatch = useMemo(() => {
        if (!match || !lastHome || !lastAway || !h2h || !standing) return match;

        const clonedMatch = { ...match };

        clonedMatch.prediction = MatchPredictorService.predict(
            lastHome,
            lastAway,
            h2h,
            standing
        );

        clonedMatch.headToHead = {
            lastMatches: [],
            homeWins: h2h.wins,
            draws: h2h.draws,
            awayWins: h2h.losses,
        };

        clonedMatch.homeStats = {
            goalsPerGame: standing.homeTeam.goalsFor / (standing.homeTeam.matchesPlayed || 1),
            concededPerGame: standing.homeTeam.goalsAgainst / (standing.homeTeam.matchesPlayed || 1),
            possession: 50,
            form: [],
            position: standing.homeTeam.position,
            points: standing.homeTeam.points,
            played: standing.homeTeam.matchesPlayed,
            wins: standing.homeTeam.wins,
            draws: 0,
            losses: 0,
        };

        clonedMatch.awayStats = {
            goalsPerGame: standing.awayTeam.goalsFor / (standing.awayTeam.matchesPlayed || 1),
            concededPerGame: standing.awayTeam.goalsAgainst / (standing.awayTeam.matchesPlayed || 1),
            possession: 50,
            form: [],
            position: standing.awayTeam.position,
            points: standing.awayTeam.points,
            played: standing.awayTeam.matchesPlayed,
            wins: standing.awayTeam.wins,
            draws: 0,
            losses: 0,
        };

        return clonedMatch;
    }, [match, lastHome, lastAway, h2h, standing]);

    return {
        data: enrichedMatch ?? null,
        loading: isMatchLoading || isLastHomeLoading || isLastAwayLoading || isH2hLoading || isStandingLoading,
        error: matchError instanceof Error ? matchError : null,
        refetch: async () => { await refetch(); }
    };
};