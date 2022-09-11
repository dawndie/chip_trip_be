import express from "express";
import { BaseController } from "../base";
import { PlaceRepository } from "@/repositories/place.repository";
import { Place } from "@/entities/place.entity";
import { Photo } from "@/entities/photo.entity";
import { Amenity } from "@/entities/amenity.entity";
import { getCustomRepository, LessThan, MoreThan } from "typeorm";
import { PhotoRepository } from "@/repositories/photo.repository";
import { CityRepository } from "@/repositories/city.repository";
import { AreaRepository } from "@/repositories/area.repository";
import { BookingRepository } from "@/repositories/booking.repository";
import { FindOneOptions } from "typeorm";
import { APPROVED_STATUS } from "@/const/common.const";
// import fs from "fs";
import AWS from "aws-sdk";
import { City } from "@/entities/city.entity";
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
        "photos",
      ],
    };
    try {
      const result = await placeRepository.findById(parseInt(placeId), option);
      if (result) {
        await result.amenities;
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
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_KEY,
      region: process.env.S3_REGION,
    });
    const imageList = req.body.dataUris;
    // const base64Uri = req.body.dataUris[0];

    // const Data = Buffer.from(base64Uri, "base64");

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
      const savedPlace = await placeRepository.manager.save(place);
      const placeId = savedPlace.id;
      if (imageList) {
        for (let i = 0; i < imageList.length; i++) {
          const Data = Buffer.from(
            req.body.dataUris[i].replace(/^data:image\/\w+;base64,/, ""),
            "base64",
          );
          const params = {
            Bucket: process.env.S3_BUCKET || "photostore.voluongbang", // pass your bucket name
            Key: `place_photo/${String(placeId)}_${i}.png`, // file will be saved as testBucket/contacts.csv
            Body: Data,
            Expires: new Date("2022-06-23"),
          };
          s3.upload(params, (s3Err: any, data: any) => {
            if (s3Err) this.getManagedError(s3Err);
            console.log(`File uploaded successfully at ${data.Key}`);
          });
          const photo = new Photo();
          const getLinkParams = {
            Bucket: process.env.S3_BUCKET || "photostore.voluongbang", // pass your bucket name
            Key: `place_photo/${String(placeId)}_${i}.png`, // file will be saved as testBucket/contacts.csvs
          };
          const url = s3.getSignedUrl("getObject", getLinkParams);

          photo.url = `https://s3.ap-southeast-1.amazonaws.com/photostore.voluongbang/place_photo/${String(
            placeId,
          )}_${i}.png`;
          photo.place = savedPlace;
          const photoRepository = getCustomRepository(PhotoRepository);
          await photoRepository.save(photo);
        }
      }

      const option: FindOneOptions<Place> = {
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
          "photos",
        ],
      };
      const result = await placeRepository.findById(savedPlace.id, option);

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

  async getRoomByPlace(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const index = req.params.place;

    try {
      const placeRepository = getCustomRepository(PlaceRepository);
      const result = await placeRepository.getPlaceByLocation(
        parseInt(req.params.page),
        10,
        index,
      );
      return this.success(req, res)(result);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  async getRoomByPlaceAndTotalGuests(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const index = req.params.place;
    const totalGuests = parseInt(req.params.totalGuests);

    try {
      const placeRepository = getCustomRepository(PlaceRepository);
      const result = await placeRepository.getPlaceByLocationAndGuest(
        parseInt(req.params.page),
        10,
        index,
        totalGuests,
      );
      return this.success(req, res)(result);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  async getSuggestions(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const query = req.body.query;

    try {
      // const result = [{ id: 3, name: "nha o huyen", address: "nfdnfdf" }];
      const cityRepository = getCustomRepository(CityRepository);
      const city = await cityRepository
        .createQueryBuilder("city")
        .where("city.name like :name", { name: `%${query}%` })
        .take(3)
        .getMany();

      const areaRepository = getCustomRepository(AreaRepository);
      const area = await areaRepository
        .createQueryBuilder("area")
        .innerJoinAndMapOne("area.city", City, "city", "city.id = area.city")
        .where("area.name like :name", { name: `%${query}%` })
        .take(3)
        .getMany();

      const placeRepository = getCustomRepository(PlaceRepository);
      const place = await placeRepository
        .createQueryBuilder("place")
        .where("place.name like :name", { name: `%${query}%` })
        .take(3)
        .getMany();

      const result = { city, area, place };

      return this.success(req, res)(result);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  async deleteById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const inputId = parseInt(req.params.id);
    try {
      const placeRepository = getCustomRepository(PlaceRepository);
      const result = await placeRepository.delete({ id: inputId });
      return this.success(req, res)(result);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  async getRoomByPlaceandTime(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const index = req.params.place;

    try {
      const placeRepository = getCustomRepository(PlaceRepository);
      const result = await placeRepository.getPlaceByLocation(
        parseInt(req.params.page),
        10,
        index,
      );
      const bookingRepository = getCustomRepository(BookingRepository);
      for (let i = 0; i < result.total; i++) {
        const checkingBooking = await bookingRepository.find({
          where: {
            place: result.data[i],
            startDate: LessThan(req.params.checkin),
            endDate: MoreThan(req.params.checkout),
          },
        });
        if (checkingBooking.length > 0) {
          result.data.splice(i, 1);
        }
      }
      return this.success(req, res)(result);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }
}

const PlaceController = new _PlaceController("PLACE_CONTROLLER");
export default PlaceController;
