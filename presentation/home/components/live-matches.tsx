import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useColors } from '@/application/hooks/use-colors'
import { MatchCard } from '@/components/MatchCard'
import { SectionHeader } from '@/components/SectionHeader'

interface LiveMatchesProps {
    liveMatches: any[];
}

export const LiveMatches = ({ liveMatches }: LiveMatchesProps) => {
    const colors = useColors();
    return (
        <View style={styles.section}>
            <SectionHeader title="En Vivo" />
            <View style={styles.matchList}>
                {liveMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
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