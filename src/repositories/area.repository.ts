import { TypeOrmRepository } from "./base/type-orm.repository";
import { Area } from "../entities/area.entity";
import { EntityRepository } from "typeorm";
@EntityRepository(Area)
export class AreaRepository extends TypeOrmRepository<Area> {}
