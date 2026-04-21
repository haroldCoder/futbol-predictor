import React, { useMemo } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { BackButton, LeagueHeader, NotFoundMatch, PredictionSection, TeamForm, TeamsHero } from './components';
import { KeyStats } from './components/key-stats';
import { HeadToHead } from './components/head-to-head';
import { LastMatches } from './components/last-matches';
import { ScrollView } from 'react-native-gesture-handler';
import { ScreenContainer } from '@/components/screen-container';
import { useGetMatchId, useMatch } from '@/application/hooks';
import { useLocalSearchParams } from 'expo-router';
import { useColors } from '@/application/hooks/use-colors';

export const MatchDetailsScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: mockMatch, loading: mockLoading } = useGetMatchId(id ?? "");
    const colors = useColors();
    // 2. Intentar obtener de API si no es mock o si queremos datos frescos
    const { data: apiMatchData, loading: apiLoading, error: apiError } = useMatch(id ?? "");

    // Determinar cuál usar
    const match = useMemo(() => mockMatch || (apiMatchData ?? null), [mockMatch, apiMatchData]);

    const isLoading = (apiLoading && !mockMatch) || (mockLoading && !id);

    if (isLoading) {
        return (
            <ScreenContainer containerClassName="bg-background">
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#00C853" />
                    <Text style={{ color: colors.muted, marginTop: 12 }}>Cargando detalles...</Text>
                </View>
            </ScreenContainer>
        );
    }

    if (!match) {
        return (
            <NotFoundMatch />
        );
    }

    return (
        <ScreenContainer containerClassName="bg-background">
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Back Button */}
                <BackButton />

                {/* League Header */}
                <LeagueHeader match={match} />

                {/* Teams Hero */}
                <TeamsHero match={match} />

                {/* Prediction Section */}
                <PredictionSection match={match} />

                {/* Team Form */}
                <TeamForm match={match} />

                {/* Key Stats */}
                <KeyStats match={match} />

                {/* Head to Head */}
                <HeadToHead match={match} />

                {/* Last Matches */}
                <LastMatches match={match} />

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
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
})