import { SectionHeader } from '@/components/SectionHeader';
import { useColors } from '@/application/hooks/use-colors';
import { MatchModel } from '@/core/domain/models'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface HeadToHeadProps {
    match: MatchModel;
}

export const HeadToHead = ({ match }: HeadToHeadProps) => {
    const colors = useColors();
    const homeTeam = match.homeTeam;
    const awayTeam = match.awayTeam;
    return (
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <SectionHeader title="Historial de Enfrentamientos" />
            <View style={styles.h2hRow}>
                <View style={styles.h2hBlock}>
                    <Text style={[styles.h2hValue, { color: "#00C853" }]}>{match.headToHead?.homeWins}</Text>
                    <Text style={[styles.h2hLabel, { color: colors.muted }]}>{homeTeam?.shortName || match.homeTeam?.shortName}</Text>
                </View>
                <View style={styles.h2hBlock}>
                    <Text style={[styles.h2hValue, { color: colors.muted }]}>{match.headToHead?.draws}</Text>
                    <Text style={[styles.h2hLabel, { color: colors.muted }]}>Empates</Text>
                </View>
                <View style={styles.h2hBlock}>
                    <Text style={[styles.h2hValue, { color: "#1565C0" }]}>{match.headToHead?.awayWins}</Text>
                    <Text style={[styles.h2hLabel, { color: colors.muted }]}>{awayTeam?.shortName || match.awayTeam?.shortName}</Text>
                </View>
            </View>

            <View style={styles.h2hBarContainer}>
                <View
                    style={[
                        styles.h2hBarSegment,
                        {
                            flex: match.headToHead?.homeWins,
                            backgroundColor: "#00C853",
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4,
                        },
                    ]}
                />
                <View style={[styles.h2hBarSegment, { flex: match.headToHead?.draws, backgroundColor: "#5A7A96" }]} />
                <View
                    style={[
                        styles.h2hBarSegment,
                        {
                            flex: match.headToHead?.awayWins,
                            backgroundColor: "#1565C0",
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4,
                        },
                    ]}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        marginBottom: 16,
    },
    h2hRow: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    h2hBlock: {
        alignItems: "center",
        gap: 4,
    },
    h2hValue: {
        fontSize: 28,
        fontWeight: "800",
    },
    h2hLabel: {
        fontSize: 11,
        fontWeight: "600",
    },
    h2hBarContainer: {
        flexDirection: "row",
        height: 8,
        borderRadius: 4,
        overflow: "hidden",
    },
    h2hBarSegment: {
        height: "100%",
    },
})