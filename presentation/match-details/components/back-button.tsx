import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useColors } from '@/application/hooks/use-colors'
import { router } from 'expo-router'

export const BackButton = () => {
    const colors = useColors();

    return (
        <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}
        >
            <Text style={styles.backArrow}>←</Text>
            <Text style={[styles.backText, { color: colors.muted }]}>Volver</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    backBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        alignSelf: "flex-start",
    },
    backArrow: {
        marginRight: 8,
        fontSize: 24,
        color: "#00C853",
        fontWeight: "800",
    },
    backText: {
        fontSize: 20,
        fontWeight: "500",
    },
})