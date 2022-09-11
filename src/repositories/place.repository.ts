import { TypeOrmRepository } from "./base/type-orm.repository";
import { Place } from "../entities/place.entity";
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
      .innerJoinAndSelect(
        "place.schedulePriceAttribute",
        "schedulePriceAttribute",
      )
      .innerJoinAndSelect("place.roomAttribute", "roomAttribute")
      .innerJoinAndSelect("place.policyAttribute", "policyAttribute")
      .innerJoinAndSelect("place.placeType", "placeType")
      .innerJoinAndSelect("place.photos", "photo")
      .innerJoinAndSelect("place.city", "city")
      .innerJoinAndSelect("place.area", "area")
      .innerJoin("place.submitStatus", "submitStatus")
      .where("submitStatus.id = :id", { id: 3 })
      .andWhere("city.name like :index", { index: `%${index}%` })
      .orWhere("area.name like :index", { index: `%${index}%` })
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

  async getPlaceByLocationAndGuest(
    page = 1,
    limit = 20,
    index: string,
    numOfGuests: number,
  ): Promise<TypeOrmPaginator<Place>> {
    const skip = (page - 1) * limit;

    const [records, count] = await this.createQueryBuilder("place")
      .innerJoinAndSelect(
        "place.schedulePriceAttribute",
        "schedulePriceAttribute",
      )
      .innerJoinAndSelect("place.roomAttribute", "roomAttribute")
      .innerJoinAndSelect("place.policyAttribute", "policyAttribute")
      .innerJoinAndSelect("place.placeType", "placeType")
      .innerJoinAndSelect("place.photos", "photo")
      .innerJoinAndSelect("place.city", "city")
      .innerJoinAndSelect("place.area", "area")
      .innerJoin("place.submitStatus", "submitStatus")
      .where("submitStatus.id = :id", { id: 3 })
      .andWhere("policyAttribute.maxNumOfPeople >=:maxNumOfPeople", {
        maxNumOfPeople: numOfGuests,
      })
      .andWhere("city.name like :index", { index: `%${index}%` })
      .orWhere("area.name like :index", { index: `%${index}%` })
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

  async getPlacePreview(id: number) {
    const result = await this.createQueryBuilder("place")
      .innerJoinAndSelect(
        "place.schedulePriceAttribute",
        "schedulePriceAttribute",
      )
      .innerJoinAndSelect("place.roomAttribute", "roomAttribute")
      .innerJoinAndSelect("place.policyAttribute", "policyAttribute")
      .innerJoinAndSelect("place.placeType", "placeType")
      .innerJoinAndSelect("place.photos", "photo")
      .innerJoinAndSelect("place.city", "city")
      .innerJoinAndSelect("place.area", "area")
      .innerJoin("place.submitStatus", "submitStatus")
      // .where("submitStatus.id = :id", { id: 3 })
      .andWhere("place.id = :id", { id })
      .getOne();
      console.log(result);
      
    return result;
  }

  // async getSuggestions(query: string) {
  //   const result = await this.createQueryBuilder("place")
  //     .innerJoinAndMapOne(
  //       "place.city_id",
  //       City,
  //       "city",
  //       "city.id = place.city_id",
  //     )
  //     .innerJoinAndMapOne(
  //       "place.area_id",
  //       Area,
  //       "area",
  //       "area.id = place.area_id",
  //     ).select
  //     // .where("place.city_id.name like :index", { index: `%${query}%` })
  //     // .orWhere("place.area_id.name like :index", { index: `%${query}%` })
  //     .take(3)
  //     .getMany();
  //   return result;
  // }
}
