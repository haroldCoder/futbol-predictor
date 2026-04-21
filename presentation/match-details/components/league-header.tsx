import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useColors } from '@/application/hooks/use-colors'
import { MatchModel } from '@/core/domain/models'

interface LeagueHeaderProps {
    match: MatchModel;
}

export const LeagueHeader = ({ match }: LeagueHeaderProps) => {
    const colors = useColors();
    return (
        <View style={styles.leagueRow}>
            <Image source={{ uri: match.leagueLogo }} style={styles.leagueEmoji} />
            <Text style={[styles.leagueName, { color: colors.muted }]}>{match.league.toUpperCase()}</Text>
            <Text style={[styles.dot, { color: colors.muted }]}>•</Text>
            <Text style={[styles.matchTime, { color: colors.muted }]}>{match.date} {match.time}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    leagueRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginBottom: 20,
    },
    leagueEmoji: { width: 20, height: 20 },
    leagueName: {
        fontSize: 13,
        fontWeight: "600",
    },
    dot: { fontSize: 13 },
    matchTime: { fontSize: 12 },
})