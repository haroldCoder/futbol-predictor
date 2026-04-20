export function formatDate(date: string): string {
    return new Date(date).toISOString().split("T")[0];
}

export function formatTime(date: string): string {
    return new Date(date).toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
    });
}