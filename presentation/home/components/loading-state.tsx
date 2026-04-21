import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useColors } from '@/application/hooks/use-colors'
import { SkeletonCard } from '@/components/SkeletonCard'
import { SectionHeader } from '@/components/SectionHeader'

export const LoadingState = () => {
    const colors = useColors();
    return (
        <View style={styles.section}>
            <SectionHeader title="Cargando partidos..." />
            <View style={styles.matchList}>
                {[1, 2, 3].map((i) => (
                    <SkeletonCard key={i} />
                ))}
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
    section: {
        marginBottom: 20,
    },
    matchList: {
        gap: 12,
    },
});