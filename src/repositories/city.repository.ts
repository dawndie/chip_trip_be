import { TypeOrmRepository } from "./base/type-orm.repository";
import { City } from "../entities/city.entity";
import { EntityRepository } from "typeorm";
@EntityRepository(City)
export class CityRepository extends TypeOrmRepository<City> {}
