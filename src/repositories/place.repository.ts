import { TypeOrmRepository } from "./base/type-orm.repository";
import { Place } from "../entities/place.entity";
import { Review } from "../entities/review.entity";
import { EntityRepository } from "typeorm";
@EntityRepository(Place)
export class PlaceRepository extends TypeOrmRepository<Place> {
  async getReviewsByRoomId(roomId: number) {
    const record = await this.createQueryBuilder("place")
      .leftJoinAndSelect("place.review", "review")
      .select(["review"])
      .where("place.id = :id", { id: roomId })
      .getOne();
      return record;
  }
}
