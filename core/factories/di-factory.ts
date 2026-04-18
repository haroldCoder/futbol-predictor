import { AuthRepository, MainRuntimeRepository, MatchRepository } from "@/core/domain/repositories";
import { AuthRepositoryImpl, MainRuntimeRepositoryImpl, FootballDataMatchRepositoryImpl } from "@/core/infrastructure/repositories";

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
}