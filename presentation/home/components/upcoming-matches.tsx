import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useColors } from '@/application/hooks/use-colors'
import { MatchCard } from '@/components/MatchCard'
import { SectionHeader } from '@/components/SectionHeader'
import { useRouter } from 'expo-router'

interface UpcomingMatchesProps {
    upcomingMatches: any[];
    predictionIsLoading: boolean;
}

export const UpcomingMatches = ({ upcomingMatches, predictionIsLoading }: UpcomingMatchesProps) => {
    const colors = useColors();
    const router = useRouter();

    return (
        <View style={styles.section}>
            <SectionHeader
                title="Próximos Partidos"
                onSeeAll={() => router.push("/matches")}
            />
            <View style={styles.matchList}>
                {upcomingMatches.map((match: any) => (
                    <MatchCard
                        key={match.id}
                        match={match}
                        predictionIsLoading={predictionIsLoading}
                        onPress={() => router.push({ pathname: "/match/[id]", params: { id: match.id.toString() } })}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 20,
    },
    matchList: {
        gap: 12,
    },
});
