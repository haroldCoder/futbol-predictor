import Constants from "expo-constants";

// Obtener API key desde expo-constants (configurado en app.config.ts)
export const getApiKey = (): string => {
    const apiKey = Constants.expoConfig?.extra?.footballDataApiKey || "";
    if (!apiKey) {
        console.warn(
            "Football Data API key not configured. Please set EXPO_PUBLIC_FOOTBALL_DATA_API_KEY environment variable.",
        );
    }
    return apiKey;
};