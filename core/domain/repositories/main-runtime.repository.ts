import { Metrics } from "react-native-safe-area-context";

export interface MainRuntimeRepository {
    isInIframe(): boolean;
    isWeb(): boolean;
    sendToParent(type: string, payload: Record<string, unknown>): void;
    subscribeSafeAreaInsets(callback: (metrics: Metrics) => void): () => void;
    isRunningInPreviewIframe(): boolean;
    initRuntime(): void;
}