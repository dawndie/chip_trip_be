import { TypeOrmRepository } from "./base/type-orm.repository";
import { Place } from "../entities/place.entity";
import { EntityRepository } from "typeorm";
@EntityRepository(Place)
export class PlaceRepository extends TypeOrmRepository<Place> {}
