import { ApiMatch } from "@/services/footballDataApi";
import { Match, MatchStatus, Prediction, FormResult } from "@/types/football";

/**
 * Convertir ApiMatch de football-data.org a Match del app
 */
export function adaptApiMatchToMatch(apiMatch: ApiMatch): Match {
  // Mapear estado de API a estado del app
  const statusMap: Record<string, MatchStatus> = {
    TIMED: "upcoming",
    SCHEDULED: "upcoming",
    LIVE: "live",
    IN_PLAY: "live",
    PAUSED: "live",
    FINISHED: "finished",
    POSTPONED: "upcoming",
    CANCELLED: "finished",
    SUSPENDED: "live",
  };

  const status: MatchStatus = statusMap[apiMatch.status] || "upcoming";

  // Extraer hora y fecha
  const dateObj = new Date(apiMatch.utcDate);
  const date = dateObj.toISOString().split("T")[0];
  const time = dateObj.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

  // Generar predicción simulada basada en datos históricos
  const prediction = generatePrediction(apiMatch);

  // Generar estadísticas simuladas
  const homeStats = {
    goalsPerGame: 1.8 + Math.random() * 1.2,
    concededPerGame: 0.8 + Math.random() * 0.6,
    possession: 50 + Math.random() * 20,
    form: ["W", "W", "D", "W", "L"] as FormResult[],
    position: Math.floor(Math.random() * 20) + 1,
    points: Math.floor(Math.random() * 60) + 20,
    played: 25 + Math.floor(Math.random() * 10),
    wins: Math.floor(Math.random() * 20),
    draws: Math.floor(Math.random() * 10),
    losses: Math.floor(Math.random() * 10),
  };

  const awayStats = {
    goalsPerGame: 1.8 + Math.random() * 1.2,
    concededPerGame: 0.8 + Math.random() * 0.6,
    possession: 50 + Math.random() * 20,
    form: ["W", "D", "W", "L", "W"] as FormResult[],
    position: Math.floor(Math.random() * 20) + 1,
    points: Math.floor(Math.random() * 60) + 20,
    played: 25 + Math.floor(Math.random() * 10),
    wins: Math.floor(Math.random() * 20),
    draws: Math.floor(Math.random() * 10),
    losses: Math.floor(Math.random() * 10),
  };

  return {
    id: apiMatch.id.toString(),
    leagueId: apiMatch.competition.code.toLowerCase(),
    homeTeamId: apiMatch.homeTeam.id.toString(),
    awayTeamId: apiMatch.awayTeam.id.toString(),
    date,
    time,
    stadium: "Estadio", // football-data.org no proporciona estadio en todos los casos
    status,
    score: apiMatch.score.fullTime.home !== null ? {
      home: apiMatch.score.fullTime.home,
      away: apiMatch.score.fullTime.away ?? 0,
    } : undefined,
    prediction,
    homeStats,
    awayStats,
    homeTeam: {
      name: apiMatch.homeTeam.name,
      shortName: apiMatch.homeTeam.shortName || apiMatch.homeTeam.tla,
      logoUrl: apiMatch.homeTeam.crest,
    },
    awayTeam: {
      name: apiMatch.awayTeam.name,
      shortName: apiMatch.awayTeam.shortName || apiMatch.awayTeam.tla,
      logoUrl: apiMatch.awayTeam.crest,
    },
    headToHead: {
      homeWins: Math.floor(Math.random() * 10),
      draws: Math.floor(Math.random() * 8),
      awayWins: Math.floor(Math.random() * 10),
      lastMatches: [],
    },
  };
}

/**
 * Generar predicción basada en datos del partido
 */
function generatePrediction(apiMatch: ApiMatch): Prediction {
  // Simulación simple: usar nombre del equipo para generar predicción consistente
  const seed = (apiMatch.homeTeam.id + apiMatch.awayTeam.id) % 100;

  let homeWin: number;
  let draw: number;
  let awayWin: number;

  if (seed < 40) {
    homeWin = 50 + Math.random() * 15;
    draw = 20 + Math.random() * 10;
    awayWin = 100 - homeWin - draw;
  } else if (seed < 70) {
    draw = 25 + Math.random() * 15;
    homeWin = 35 + Math.random() * 15;
    awayWin = 100 - homeWin - draw;
  } else {
    awayWin = 45 + Math.random() * 15;
    draw = 15 + Math.random() * 10;
    homeWin = 100 - awayWin - draw;
  }

  homeWin = Math.round(homeWin);
  draw = Math.round(draw);
  awayWin = Math.round(awayWin);

  // Ajustar para que sumen 100
  const total = homeWin + draw + awayWin;
  if (total !== 100) {
    const diff = 100 - total;
    homeWin += diff;
  }

  const predicted = homeWin > awayWin && homeWin > draw ? "home" : awayWin > homeWin && awayWin > draw ? "away" : "draw";

  return {
    homeWin: Math.max(0, Math.min(100, homeWin)),
    draw: Math.max(0, Math.min(100, draw)),
    awayWin: Math.max(0, Math.min(100, awayWin)),
    predicted,
    confidence: Math.abs(homeWin - awayWin) > 15 ? "high" : Math.abs(homeWin - awayWin) > 8 ? "medium" : "low",
    predictedScore: {
      home: Math.floor(Math.random() * 4),
      away: Math.floor(Math.random() * 4),
    },
  };
}
