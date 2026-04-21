import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useColors } from '@/application/hooks/use-colors'

interface HeaderProps {
    accuracy: {
        overall: number;
    };
}

export const Header = ({ accuracy }: HeaderProps) => {
    const colors = useColors();
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <Text style={styles.appName}>⚽ FutbolPredictor</Text>
                <Text style={[styles.subtitle, { color: colors.muted }]}>Datos en tiempo real</Text>
            </View>
            <View style={[styles.accuracyBadge, { backgroundColor: "#00C85322", borderColor: "#00C853" }]}>
                <Text style={styles.accuracyValue}>{accuracy.overall}%</Text>
                <Text style={styles.accuracyLabel}>Aciertos</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 16,
        paddingTop: 4,
    },
    headerLeft: {
        gap: 2,
    },
    appName: {
        fontSize: 22,
        fontWeight: "800",
        color: "#E8F4FD",
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 13,
    },
    accuracyBadge: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        alignItems: "center",
    },
    accuracyValue: {
        color: "#00C853",
        fontSize: 18,
        fontWeight: "800",
    },
    accuracyLabel: {
        color: "#00C853",
        fontSize: 10,
        fontWeight: "600",
    },
});

