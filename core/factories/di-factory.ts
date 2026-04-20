import { AuthRepository, MainRuntimeRepository, MatchRepository, StadingRepository } from "@/core/domain/repositories";
import { AuthRepositoryImpl, MainRuntimeRepositoryImpl, FootballDataMatchRepositoryImpl, FootballDataStadingRepositoryImpl } from "@/core/infrastructure/repositories";

export class DiFactory {
    static getMainRuntimeRepository(): MainRuntimeRepository {
        return new MainRuntimeRepositoryImpl();
    }

    static getAuthRepository(): AuthRepository {
        return new AuthRepositoryImpl();
    }

    static getMatchRepository(): MatchRepository {
        return new FootballDataMatchRepositoryImpl();
    }

    static getStadingRepository(): StadingRepository {
        return new FootballDataStadingRepositoryImpl();
    }
}