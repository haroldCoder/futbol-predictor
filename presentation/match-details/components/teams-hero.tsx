import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useColors } from '@/application/hooks/use-colors'
import { MatchModel } from '@/core/domain/models'
import { TeamLogo } from '@/components/TeamLogo';

interface TeamsHeroProps {
    match: MatchModel;
}

export const TeamsHero = ({ match }: TeamsHeroProps) => {
    const colors = useColors();
    const homeName = match.homeTeam?.name || match.homeTeamId.toUpperCase();
    const awayName = match.awayTeam?.name || match.awayTeamId.toUpperCase();
    const homeEmoji = match.homeTeam?.logoUrl || "⚽";
    const awayEmoji = match.awayTeam?.logoUrl || "⚽";

    return (
        <View style={[styles.teamsHero, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.topAccent, { backgroundColor: "#00C853" }]} />
            <View style={styles.teamsRow}>
                <View style={styles.teamCol}>
                    <TeamLogo source={homeEmoji} size={40} />
                    <Text style={[styles.teamNameHero, { color: colors.foreground }]} numberOfLines={2}>
                        {homeName}
                    </Text>
                    <Text style={[styles.teamRole, { color: colors.muted }]}>Local</Text>
                </View>

                <View style={styles.centerCol}>
                    <Text style={[styles.vsHero, { color: colors.muted }]}>VS</Text>
                    <View style={[styles.scorePreview, { backgroundColor: "#00C85322", borderColor: "#00C853" }]}>
                        <Text style={styles.scorePreviewText}>
                            {match.prediction?.predictedScore.home}-{match.prediction?.predictedScore.away}
                        </Text>
                    </View>
                    <Text style={[styles.stadiumText, { color: colors.muted }]} numberOfLines={1}>
                        {match.stadium}
                    </Text>
                </View>

                <View style={[styles.teamCol, styles.teamColRight]}>
                    <TeamLogo source={awayEmoji} size={40} />
                    <Text style={[styles.teamNameHero, { color: colors.foreground, textAlign: "right" }]} numberOfLines={2}>
                        {awayName}
                    </Text>
                    <Text style={[styles.teamRole, { color: colors.muted }]}>Visitante</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    teamsHero: {
        borderRadius: 16,
        borderWidth: 1,
        overflow: "hidden",
        marginBottom: 16,
    },
    topAccent: {
        height: 4,
        width: "100%",
    },
    teamsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
    },
    teamCol: {
        flex: 1,
        alignItems: "center",
        gap: 8,
    },
    teamColRight: {
        alignItems: "flex-end",
    },
    teamNameHero: {
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        lineHeight: 20,
    },
    teamRole: {
        fontSize: 11,
        fontWeight: "500",
    },
    centerCol: {
        flex: 1,
        alignItems: "center",
        gap: 8,
    },
    vsHero: {
        fontSize: 18,
        fontWeight: "800",
    },
    scorePreview: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
    },
    scorePreviewText: {
        fontSize: 24,
        fontWeight: "800",
        color: "#00C853",
    },
    stadiumText: {
        fontSize: 12,
        textAlign: "center",
    },
})
