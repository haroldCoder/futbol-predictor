import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface StatCompareRowProps {
    label: string;
    home: string;
    away: string;
    homeColor: string;
    awayColor: string;
    mutedColor: string;
}

export const StatCompareRow = ({ label, home, away, homeColor, awayColor, mutedColor }: StatCompareRowProps) => {
    return (
        <View style={styles.row}>
            <Text style={[styles.value, { color: homeColor }]}>{home}</Text>
            <Text style={[styles.label, { color: mutedColor }]}>{label}</Text>
            <Text style={[styles.value, { color: awayColor, textAlign: "right" }]}>{away}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: "#1E3A55",
    },
    value: {
        fontSize: 14,
        fontWeight: "700",
        width: 60,
    },
    label: {
        fontSize: 12,
        flex: 1,
        textAlign: "center",
    },
})
