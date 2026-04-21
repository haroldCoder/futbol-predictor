import { PredictionBar } from '@/components/PredictionBar'
import { SectionHeader } from '@/components/SectionHeader'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useColors } from '@/application/hooks/use-colors'
import { MatchModel } from '@/core/domain/models'

interface PredictionSectionProps {
    match: MatchModel;
}

export const PredictionSection = ({ match }: PredictionSectionProps) => {
    const colors = useColors();
    const predictedTeam =
        match.awayTeam?.shortName || match.awayTeamId;

    return (
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <SectionHeader title="Predicción IA" />
            {match.prediction && <PredictionBar prediction={match.prediction} />}
            <View style={styles.winnerBanner}>
                <Text style={[styles.winnerLabel, { color: colors.muted }]}>Ganador Predicho</Text>
                <Text style={styles.winnerValue}>{predictedTeam}</Text>
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
    winnerBanner: {
        marginTop: 16,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#00C85322",
        borderWidth: 1,
        borderColor: "#00C853",
        alignItems: "center",
    },
    winnerLabel: {
        fontSize: 12,
        fontWeight: "500",
    },
    winnerValue: {
        fontSize: 18,
        fontWeight: "700",
        color: "#00C853",
    },
})