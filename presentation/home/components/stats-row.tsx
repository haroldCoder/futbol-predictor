import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useColors } from '@/application/hooks/use-colors'

interface StatsRowProps {
    convertedMatches: any[];
    liveMatches: any[];
    upcomingMatches: any[];
}

export const StatsRow = ({ convertedMatches, liveMatches, upcomingMatches }: StatsRowProps) => {
    const colors = useColors();
    return (
        <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={styles.statValue}>{convertedMatches.length}</Text>
                <Text style={[styles.statLabel, { color: colors.muted }]}>Partidos Hoy</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.statValue, { color: "#00C853" }]}>{liveMatches.length}</Text>
                <Text style={[styles.statLabel, { color: colors.muted }]}>En Vivo</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.statValue, { color: "#1565C0" }]}>{upcomingMatches.length}</Text>
                <Text style={[styles.statLabel, { color: colors.muted }]}>Próximos</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    statsRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
        borderWidth: 1,
        gap: 2,
    },
    statValue: {
        fontSize: 20,
        fontWeight: "800",
        color: "#E8F4FD",
    },
    statLabel: {
        fontSize: 10,
        fontWeight: "600",
    },
});

