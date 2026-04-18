import { Platform } from "react-native";
import type { Metrics } from "react-native-safe-area-context";
import { MainRuntimeRepository } from "@/core/domain/repositories";

interface SpacePreviewerMessage {
    type: "SpacePreviewerChannel";
    payload: {
        type: string;
        from: "container" | "content";
        to: "container" | "content";
        payload: Record<string, unknown>;
    };
}

export class MainRuntimeRepositoryImpl implements MainRuntimeRepository {
    private initialized = false;
    private safeAreaCallback: ((metrics: Metrics) => void) | null = null;
    private DEBUG = true;

    private log(msg: string) {
        if (!this.DEBUG) return;
        const ts = new Date().toISOString();
        console.log(`[MainRuntimeRepository ${ts}] ${msg}`);
    }

    isInIframe(): boolean {
        if (Platform.OS !== "web") return false;
        try {
            return window.self !== window.top;
        } catch {
            return true;
        }
    }

    isWeb(): boolean {
        return Platform.OS === "web";
    }

    isRunningInPreviewIframe(): boolean {
        return this.isWeb() && this.isInIframe();
    }

    sendToParent(type: string, payload: Record<string, unknown> = {}): void {
        if (!this.isWeb() || !this.isInIframe()) return;

        const message: SpacePreviewerMessage = {
            type: "SpacePreviewerChannel",
            payload: { type, from: "content", to: "container", payload },
        };
        window.parent.postMessage(message, "*");
        this.log(`Sent to parent: ${type}`);
    }

    private isValidInsets(payload: Record<string, unknown>): boolean {
        return (
            typeof payload.top === "number" &&
            typeof payload.bottom === "number" &&
            typeof payload.left === "number" &&
            typeof payload.right === "number"
        );
    }

    private handleMessage(event: MessageEvent<unknown>): void {
        const data = event.data as SpacePreviewerMessage | undefined;
        if (!data || data.type !== "SpacePreviewerChannel") return;

        const { payload } = data;
        if (!payload || payload.to !== "content") return;

        if (payload.type === "setSafeAreaInsets" && this.isValidInsets(payload.payload) && this.safeAreaCallback) {
            const insets = payload.payload as any;
            const frame = { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight };
            this.safeAreaCallback({ insets, frame });
            this.log(
                `Received safe area insets from parent: top=${insets.top}, bottom=${insets.bottom}, left=${insets.left}, right=${insets.right}`,
            );
        }
    }

    subscribeSafeAreaInsets(callback: (metrics: Metrics) => void): () => void {
        this.safeAreaCallback = callback;
        return () => {
            if (this.safeAreaCallback === callback) {
                this.safeAreaCallback = null;
            }
        };
    }

    initRuntime(): void {
        if (!this.isWeb() || !this.isInIframe()) return;
        if (this.initialized) return;
        this.initialized = true;

        this.log("initRuntime called");
        window.addEventListener("message", (event) => this.handleMessage(event));
        this.sendToParent("appDevServerReady", {});
    }
}
