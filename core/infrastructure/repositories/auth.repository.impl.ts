import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { SESSION_TOKEN_KEY, USER_INFO_KEY } from "@/core/domain/constants";
import { AuthRepository } from "@/core/domain/repositories";
import { User } from "@/core/domain/types";

export class AuthRepositoryImpl implements AuthRepository {
    async getSessionToken(): Promise<string | null> {
        try {
            if (Platform.OS === "web") {
                console.log("[AuthRepository] Web platform uses cookie-based auth, skipping token retrieval");
                return null;
            }

            console.log("[AuthRepository] Getting session token...");
            const token = await SecureStore.getItemAsync(SESSION_TOKEN_KEY);
            console.log(
                "[AuthRepository] Session token retrieved from SecureStore:",
                token ? `present (${token.substring(0, 20)}...)` : "missing",
            );
            return token;
        } catch (error) {
            console.error("[AuthRepository] Failed to get session token:", error);
            return null;
        }
    }

    async setSessionToken(token: string): Promise<void> {
        try {
            if (Platform.OS === "web") {
                console.log("[AuthRepository] Web platform uses cookie-based auth, skipping token storage");
                return;
            }

            console.log("[AuthRepository] Setting session token...", token.substring(0, 20) + "...");
            await SecureStore.setItemAsync(SESSION_TOKEN_KEY, token);
            console.log("[AuthRepository] Session token stored in SecureStore successfully");
        } catch (error) {
            console.error("[AuthRepository] Failed to set session token:", error);
            throw error;
        }
    }

    async removeSessionToken(): Promise<void> {
        try {
            if (Platform.OS === "web") {
                console.log("[AuthRepository] Web platform uses cookie-based auth, skipping token removal");
                return;
            }

            console.log("[AuthRepository] Removing session token...");
            await SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
            console.log("[AuthRepository] Session token removed from SecureStore successfully");
        } catch (error) {
            console.error("[AuthRepository] Failed to remove session token:", error);
        }
    }

    async getUserInfo(): Promise<User | null> {
        try {
            console.log("[AuthRepository] Getting user info...");

            let info: string | null = null;
            if (Platform.OS === "web") {
                info = window.localStorage.getItem(USER_INFO_KEY);
            } else {
                info = await SecureStore.getItemAsync(USER_INFO_KEY);
            }

            if (!info) {
                console.log("[AuthRepository] No user info found");
                return null;
            }
            const user = JSON.parse(info);
            // Convert date string back to Date object if needed
            if (user.lastSignedIn) {
                user.lastSignedIn = new Date(user.lastSignedIn);
            }
            console.log("[AuthRepository] User info retrieved:", user);
            return user;
        } catch (error) {
            console.error("[AuthRepository] Failed to get user info:", error);
            return null;
        }
    }

    async setUserInfo(user: User): Promise<void> {
        try {
            console.log("[AuthRepository] Setting user info...", user);

            if (Platform.OS === "web") {
                window.localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
                console.log("[AuthRepository] User info stored in localStorage successfully");
                return;
            }

            await SecureStore.setItemAsync(USER_INFO_KEY, JSON.stringify(user));
            console.log("[AuthRepository] User info stored in SecureStore successfully");
        } catch (error) {
            console.error("[AuthRepository] Failed to set user info:", error);
        }
    }

    async clearUserInfo(): Promise<void> {
        try {
            if (Platform.OS === "web") {
                window.localStorage.removeItem(USER_INFO_KEY);
                return;
            }

            await SecureStore.deleteItemAsync(USER_INFO_KEY);
        } catch (error) {
            console.error("[AuthRepository] Failed to clear user info:", error);
        }
    }
}
