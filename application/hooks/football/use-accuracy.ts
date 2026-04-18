export function useModelAccuracy() {
    const getModelAccuracy = () => ({
        overall: 68,
        byLeague: {
            pl: 71,
            laliga: 69,
            ucl: 65,
            seriea: 67,
            bundesliga: 72,
            ligue1: 64,
        },
        totalPredictions: 342,
        correctPredictions: 233,
    });

    return { getModelAccuracy };
}
