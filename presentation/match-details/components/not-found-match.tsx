import React from 'react'
import { ScreenContainer } from '@/components/screen-container'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useColors } from '@/application/hooks/use-colors'
import { useRouter } from 'expo-router'

export const NotFoundMatch = () => {
    const colors = useColors();
    const router = useRouter();
    return (
        <ScreenContainer containerClassName="bg-background">
            <View style={styles.center}>
                <Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "700" }}>⚽</Text>
                <Text style={{ color: colors.foreground, marginTop: 8 }}>Partido no encontrado</Text>
                <Pressable onPress={() => router.back()} style={{ marginTop: 20 }}>
                    <Text style={{ color: "#00C853", fontWeight: "600" }}>Volver al inicio</Text>
                </Pressable>
            </View>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
})
