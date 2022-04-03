import express from "express";
import { BaseController } from "../base";
// import { PlaceRepository } from "@/repositories/place.repository";
// import { AppError } from "../models";
class _PlaceController extends BaseController {
  async getPlaceInformation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    // const placeRepo = new PlaceRepository();
    // placeRepo.create();
  }
  async createPlace(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const {
      name,
      address,
      detail,
      placeType,
      host,
      city,
      area,
      country,
      amenities,
      policyAttributes,
      roomAttributes,
      schedulePriceAttributes,
    } = req.body;
    return this.success(
      req,
      res,
    )({
      name,
      address,
      detail,
      placeType,
      host,
      city,
      area,
      country,
      amenities,
      policyAttributes,
      roomAttributes,
      schedulePriceAttributes,
    });
  }
}

const PlaceController = new _PlaceController("PLACE_CONTROLLER");
export default PlaceController;
