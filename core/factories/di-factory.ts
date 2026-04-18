import { AuthRepository, MainRuntimeRepository } from "@/core/domain/repositories";
import { AuthRepositoryImpl, MainRuntimeRepositoryImpl } from "@/core/infrastructure/repositories";

export class DiFactory {
    static getMainRuntimeRepository(): MainRuntimeRepository {
        return new MainRuntimeRepositoryImpl();
    }

    static getAuthRepository(): AuthRepository {
        return new AuthRepositoryImpl();
    }
}