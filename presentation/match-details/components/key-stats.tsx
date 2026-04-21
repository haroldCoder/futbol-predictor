import { SectionHeader } from '@/components/SectionHeader'
import { useColors } from '@/application/hooks/use-colors'
import { MatchModel } from '@/core/domain/models'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatCompareRow } from './stat-compare-row'

interface KeyStatsProps {
    match: MatchModel;
}

export const KeyStats = ({ match }: KeyStatsProps) => {
    const colors = useColors();
    return (
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <SectionHeader title="Estadísticas Clave" />
            <StatCompareRow
                label="Goles por partido"
                home={match.homeStats?.goalsPerGame.toFixed(1) ?? "0"}
                away={match.awayStats?.goalsPerGame.toFixed(1) ?? "0"}
                homeColor={colors.foreground}
                awayColor={colors.foreground}
                mutedColor={colors.muted}
            />
            <StatCompareRow
                label="Goles concedidos"
                home={match.homeStats?.concededPerGame.toFixed(1) ?? "0"}
                away={match.awayStats?.concededPerGame.toFixed(1) ?? "0"}
                homeColor={colors.foreground}
                awayColor={colors.foreground}
                mutedColor={colors.muted}
            />
            <StatCompareRow
                label="Posesión promedio"
                home={`${match.homeStats?.possession}%`}
                away={`${match.awayStats?.possession}%`}
                homeColor={colors.foreground}
                awayColor={colors.foreground}
                mutedColor={colors.muted}
            />
            <StatCompareRow
                label="Posición en liga"
                home={`#${match.homeStats?.position}`}
                away={`#${match.awayStats?.position}`}
                homeColor={colors.foreground}
                awayColor={colors.foreground}
                mutedColor={colors.muted}
            />
            <StatCompareRow
                label="Puntos"
                home={`${match.homeStats?.points}`}
                away={`${match.awayStats?.points}`}
                homeColor="#00C853"
                awayColor="#1565C0"
                mutedColor={colors.muted}
            />
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
})