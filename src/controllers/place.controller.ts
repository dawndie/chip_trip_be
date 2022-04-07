import express from "express";
import { BaseController } from "../base";
import { PlaceRepository } from "@/repositories/place.repository";
import { Place } from "@/entities/place.entity";
import { Amenity } from "@/entities/amenity.entity";
import { getCustomRepository } from "typeorm";
import { FindOneOptions } from "typeorm";
import { APPROVED_STATUS } from "@/const/common.const";
class _PlaceController extends BaseController {
  async getPlaceInformation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const placeRepository = getCustomRepository(PlaceRepository);
    const placeId = req.params.id;
    const option: FindOneOptions<Place> = {
      where: { submitStatus: APPROVED_STATUS.id },
      relations: [
        "host",
        "area",
        "city",
        "country",
        "amenities",
        "placeType",
        "policyAttribute",
        "roomAttribute",
        "schedulePriceAttribute",
      ],
    };
    try {
      const result = await placeRepository.findById(parseInt(placeId), option);
      if (result) {
        await result.amenities;
        console.log(result);
        return this.success(req, res)(result);
      } else {
        return this.success(req, res)("Data not exists");
      }
    } catch (error) {
      next(this.getManagedError(error));
    }
  }
  async createPlace(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const amenities = req.body.amenities.map((element: number) => {
      const amenity = new Amenity();
      amenity.id = element;
      return amenity;
    });
    const place = new Place();
    place.name = req.body.name;
    place.address = req.body.address;
    place.detail = req.body.detail;
    place.placeType = req.body.placeType;
    place.host = req.body.host;
    place.city = req.body.city;
    place.area = req.body.area;
    place.country = req.body.country;
    place.amenities = amenities;
    place.policyAttribute = req.body.policyAttribute;
    place.roomAttribute = req.body.roomAttribute;
    place.schedulePriceAttribute = req.body.schedulePriceAttribute;
    try {
      const placeRepository = getCustomRepository(PlaceRepository);
      const result = await placeRepository.manager.save(place);

      return this.success(req, res)(result);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  async getPlaceReview(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const placeRepository = getCustomRepository(PlaceRepository);
      const result = await placeRepository.getReviewsByRoomId(
        parseInt(req.params.id),
      );
      return this.success(req, res)(result);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }
}

const PlaceController = new _PlaceController("PLACE_CONTROLLER");
export default PlaceController;
