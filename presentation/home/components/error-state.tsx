import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useColors } from '@/application/hooks/use-colors'

export const ErrorState = () => {
    const colors = useColors();
    return (
        <View style={[styles.errorContainer, { backgroundColor: "#F4433622", borderColor: "#F44336" }]}>
            <Text style={[styles.errorText, { color: "#F44336" }]}>
                Error al cargar partidos. Verifica tu conexión.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    errorContainer: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        alignItems: "center",
        gap: 2,
    },
    errorText: {
        fontSize: 14,
        fontWeight: "600",
    },
});
