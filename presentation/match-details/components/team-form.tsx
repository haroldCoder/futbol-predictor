import { FormIndicator } from '@/components/FormIndicator'
import { SectionHeader } from '@/components/SectionHeader'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useColors } from '@/application/hooks/use-colors'
import { MatchModel } from '@/core/domain/models'

interface TeamFormProps {
    match: MatchModel;
}

export const TeamForm = ({ match }: TeamFormProps) => {
    const colors = useColors();
    const homeTeam = match.homeTeam;
    const awayTeam = match.awayTeam;
    return (
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <SectionHeader title="Forma Reciente" />
            <View style={styles.formRow}>
                <View style={styles.formTeam}>
                    <Text style={[styles.formTeamName, { color: colors.foreground }]}>{homeTeam?.shortName || match.homeTeam?.shortName}</Text>
                    <FormIndicator form={match.homeStats?.form ?? []} />
                </View>
                <View style={styles.formTeam}>
                    <Text style={[styles.formTeamName, { color: colors.foreground, textAlign: "right" }]}>
                        {awayTeam?.shortName || match.awayTeam?.shortName}
                    </Text>
                    <FormIndicator form={match.awayStats?.form ?? []} />
                </View>
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
    formRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
    },
    formTeam: {
        flex: 1,
        alignItems: "center",
        gap: 8,
    },
    formTeamName: {
        fontSize: 14,
        fontWeight: "600",
    },
})