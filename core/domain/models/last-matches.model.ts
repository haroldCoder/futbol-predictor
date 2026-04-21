export interface LastMatchesModel {
    resultSet: {
        competition: string;
        played: number;
        wins: number;
    },
    matches: Array<{
        homeTeam: {
            id: number;
            name: string;
        }
        awayTeam: {
            id: number;
            name: string;
        }
        score: {
            home: number;
            away: number;
        }
    }>
}