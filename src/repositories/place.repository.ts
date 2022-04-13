import { TypeOrmRepository } from "./base/type-orm.repository";
import { Place } from "../entities/place.entity";
import { City } from "@/entities/city.entity";
import { Area } from "@/entities/area.entity";
import { EntityRepository } from "typeorm";
import { TypeOrmPaginator } from "./base/type-orm.type";

@EntityRepository(Place)
export class PlaceRepository extends TypeOrmRepository<Place> {
  async getReviewsByRoomId(roomId: number) {
    const record = await this.createQueryBuilder("place")
      .leftJoinAndSelect("place.review", "review")
      // .select(["review.score"])
      .where("place.id = :id", { id: roomId })
      .getOne();
    return record;
  }

  async getPlaceByLocation(
    page = 1,
    limit = 20,
    index: string,
  ): Promise<TypeOrmPaginator<Place>> {
    const skip = (page - 1) * limit;

    const [records, count] = await this.createQueryBuilder("place")
      .innerJoinAndMapOne(
        "place.city_id",
        City,
        "city",
        "city.id = place.city_id",
      )
      .innerJoinAndMapOne(
        "place.area_id",
        Area,
        "area",
        "area.id = place.area_id",
      )
      .where("place.city_id.name like :index", { index: `%${index}%` })
      .orWhere("place.area_id.name like :index", { index: `%${index}%` })
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    const lastPage = count < limit ? 1 : Math.ceil(count / limit);

    return {
      data: records,
      page,
      limit,
      lastPage,
      total: count,
    };
  }
}
