import React, { useMemo } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ScreenContainer } from '@/components/screen-container'
import { useColors } from '@/application/hooks/use-colors'
import { EmptyState, ErrorState, Header, LiveMatches, LoadingState, StatsRow, UpcomingMatches } from './components'
import { useTodayMatches } from '@/application/hooks'

export const HomeScreen = () => {
    const colors = useColors();
    const { data: matches, loading, predictionsLoading, error } = useTodayMatches();

    // Convertir ApiMatch a Match y separar por estado
    const convertedMatches = useMemo(() => matches ?? [], [matches]);
    const upcomingMatches = useMemo(() => convertedMatches.filter((m) => m.status === "upcoming").slice(0, 5), [convertedMatches]);
    const liveMatches = useMemo(() => convertedMatches.filter((m) => m.status === "live"), [convertedMatches]);

    // Calcular estadísticas simuladas (en producción, vendría del backend)
    const accuracy = {
        overall: 68,
        totalPredictions: 342,
        correctPredictions: 233,
    };

    return (
        <ScreenContainer containerClassName="bg-background">
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Header accuracy={accuracy} />

                {/* Stats Row */}
                <StatsRow convertedMatches={convertedMatches} liveMatches={liveMatches} upcomingMatches={upcomingMatches} />

                {/* Error State */}
                {error && (
                    <ErrorState />
                )}

                {/* Loading State */}
                {loading && (
                    <LoadingState />
                )}

                {/* Live Matches */}
                {!loading && liveMatches.length > 0 && (
                    <LiveMatches liveMatches={liveMatches} />
                )}

                {/* Upcoming Matches */}
                {!loading && upcomingMatches.length > 0 && (
                    <UpcomingMatches upcomingMatches={upcomingMatches} predictionIsLoading={predictionsLoading} />
                )}

                {/* Empty State */}
                {!loading && !error && convertedMatches.length === 0 && (
                    <View style={styles.emptyContainer}>
                        <EmptyState />
                    </View>
                )}

                {/* Bottom spacing */}
                <View style={{ height: 20 }} />
            </ScrollView>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    emptyContainer: {
        marginTop: 20,
    },
});

