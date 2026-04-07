import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { Image } from "expo-image";

interface TeamLogoProps {
    source?: string;
    size?: number;
    style?: StyleProp<any>;
    textStyle?: StyleProp<TextStyle>;
    fallback?: string;
}

export function TeamLogo({
    source,
    size = 24,
    style,
    textStyle,
    fallback = "⚽"
}: TeamLogoProps) {
    const isUrl = source?.startsWith("http") || source?.startsWith("https");

    if (!source) {
        return (
            <View style={[styles.container, { width: size, height: size }, style]}>
                <Text style={[styles.fallback, { fontSize: size * 0.7 }, textStyle]}>{fallback}</Text>
            </View>
        );
    }

    if (isUrl) {
        return (
            <Image
                source={{ uri: source }}
                style={[styles.image, { width: size, height: size }, style]}
                contentFit="contain"
                transition={200}
                placeholder={fallback}
                cachePolicy="disk"
            />
        );
    }

    // Si no es URL, asuimos que es un emoji o texto corto
    return (
        <View style={[styles.container, { width: size, height: size }, style]}>
            <Text style={[styles.emoji, { fontSize: size * 0.8 }, textStyle]}>{source}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        backgroundColor: "transparent",
    },
    emoji: {
        textAlign: "center",
    },
    fallback: {
        textAlign: "center",
    },
});
