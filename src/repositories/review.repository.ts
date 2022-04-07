import { TypeOrmRepository } from "./base/type-orm.repository";
import { Review } from "../entities/review.entity";
import { EntityRepository } from "typeorm";
@EntityRepository(Review)
export class PlaceRepository extends TypeOrmRepository<Review> {}
