import { MainRuntimeRepository } from "@/core/domain/repositories";
import { MainRuntimeRepositoryImpl } from "@/core/infrastructure/repositories";

export class DiFactory {
    static getMainRuntimeRepository(): MainRuntimeRepository {
        return new MainRuntimeRepositoryImpl();
    }
}