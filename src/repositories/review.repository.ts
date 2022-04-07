import { TypeOrmRepository } from "./base/type-orm.repository";
import { Review } from "../entities/review.entity";
import { EntityRepository } from "typeorm";
@EntityRepository(Review)
export class ReviewRepository extends TypeOrmRepository<Review> {
  async getReviewByPlaceId(placeId: number) {
    const records = await this.createQueryBuilder("review")
      .where("place_id = :id", { id: placeId })
      .innerJoinAndSelect("review.user", "user")
      .select([
        "review.id",
        "review.score",
        "review.comment",
        "user.id",
        "user.firstName",
        "user.lastName",
        "review.updated_at",
      ])
      .getRawMany();
    return records;
  }
}
