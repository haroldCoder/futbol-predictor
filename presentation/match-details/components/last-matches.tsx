import { useColors } from '@/application/hooks/use-colors';
import { MatchModel } from '@/core/domain/models';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface LastMatchesProps {
    match: MatchModel;
}

export const LastMatches = ({ match }: LastMatchesProps) => {
    const colors = useColors();
    const homeTeam = match.homeTeam;
    const awayTeam = match.awayTeam;
    return (
        <View style={styles.lastMatchesContainer}>
            <Text style={[styles.lastMatchesTitle, { color: colors.muted }]}>Últimos Enfrentamientos</Text>
            {match.headToHead?.lastMatches.map((lm: any, i: number) => {
                const isHome = lm.homeTeamId === match.homeTeamId;
                const homeTeamName = isHome ? (homeTeam?.shortName || match.homeTeam?.shortName) : (awayTeam?.shortName || match.awayTeam?.shortName);
                const awayTeamName = isHome ? (awayTeam?.shortName || match.awayTeam?.shortName) : (homeTeam?.shortName || match.homeTeam?.shortName);
                return (
                    <View key={i} style={[styles.lastMatchRow, { borderColor: colors.border }]}>
                        <Text style={[styles.lastMatchDate, { color: colors.muted }]}>{lm.date}</Text>
                        <Text style={[styles.lastMatchTeams, { color: colors.foreground }]}>
                            {homeTeamName} {lm.homeScore} - {lm.awayScore} {awayTeamName}
                        </Text>
                    </View>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    lastMatchesContainer: {
        borderRadius: 16,
        borderWidth: 1,
        padding: 16,
        marginBottom: 16,
    },
    lastMatchesTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
    },
    lastMatchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: "#1E3A55",
    },
    lastMatchDate: {
        fontSize: 12,
        width: 80,
    },
    lastMatchTeams: {
        fontSize: 12,
        flex: 1,
        textAlign: "right",
    },
})