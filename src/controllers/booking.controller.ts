import express from "express";
import { BaseController } from "../base";
import { BookingRepository } from "@/repositories/booking.repository";
import { getCustomRepository } from "typeorm";
import { Booking } from "@/entities/booking.entity";
import { Place } from "@/entities/place.entity";
import { Photo } from "@/entities/photo.entity";
import { PlaceType } from "@/entities/placeType.entity";
import { SchedulePriceAttribute } from "@/entities/schedulePriceAttributes.entity";
class _BookingController extends BaseController {
  async createNewBooking(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const inputBooking = new Booking();
      inputBooking.startDate = new Date(req.body.start_date);
      inputBooking.endDate = new Date(req.body.end_date);
      inputBooking.numOfPeople = parseInt(req.body.num_of_people);
      inputBooking.place = req.body.place_id;
      inputBooking.user = res.locals.userId;
      inputBooking.coupon = req.body.coupon_code;
      inputBooking.price = req.body.total_price;
      const bookingRepository = getCustomRepository(BookingRepository);
      const booking = await bookingRepository.save(inputBooking);
      return this.success(req, res)(booking);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  async getUserBooking(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const userId = parseInt(req.params.id);
      const bookingRepository = getCustomRepository(BookingRepository);
      const bookingList = await bookingRepository
        .createQueryBuilder("booking")
        .innerJoinAndMapOne(
          "booking.place",
          Place,
          "place",
          "place.id = booking.place_id",
        )
        .innerJoinAndMapMany(
          "booking.photo",
          Photo,
          "photo",
          "place.id = photo.place_id",
        )
        .innerJoinAndMapOne(
          "booking.placeType",
          PlaceType,
          "placeType",
          "place.placeType = placeType.id",
        )
        .where("booking.user_id = :userId", { userId })
        .getMany();
      // const bookingList = await bookingRepository.find({
      //   where: { user: userId },
      //   relations: ["place"]
      // });
      return this.success(req, res)(bookingList);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }
}

const BookingController = new _BookingController("BOOKING_CONTROLLER");
export default BookingController;
