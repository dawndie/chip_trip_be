import { TypeOrmRepository } from "./base/type-orm.repository";
import { EntityRepository } from "typeorm";
import { Recommend } from "@/entities/recommend.entity";
@EntityRepository(Recommend)
export class RecommendRepository extends TypeOrmRepository<Recommend> {}
