import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useColors } from '@/application/hooks/use-colors'

export const EmptyState = () => {
    const colors = useColors();
    return (
        <View style={[styles.emptyContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={styles.emptyEmoji}>⚽</Text>
            <Text style={[styles.emptyText, { color: colors.muted }]}>
                No hay partidos programados para hoy.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
        gap: 2,
    },
    emptyEmoji: {
        fontSize: 24,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        fontWeight: "600",
    },
});