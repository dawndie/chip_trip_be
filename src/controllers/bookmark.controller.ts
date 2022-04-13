import express from "express";
import { BaseController } from "../base";
import { BookmarkRepository } from "@/repositories/bookmark.repository";
import { getCustomRepository } from "typeorm";
import { Bookmark } from "@/entities/bookmark.entity";
import { Place } from "@/entities/place.entity";
import { User } from "@/entities/user.entity";
import { SchedulePriceAttribute } from "@/entities/schedulePriceAttributes.entity";
import { Photo } from "@/entities/photo.entity";
class _ReviewController extends BaseController {
  async checkBookmark(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const bookmarkRepository = getCustomRepository(BookmarkRepository);
      const bookmark = await bookmarkRepository.findOne({
        user: res.locals.userId,
        place: req.body.placeId,
      });
      let isBookmarked = false;
      if (bookmark) {
        isBookmarked = true;
      }
      return this.success(req, res)({ isBookmarked });
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  async createBookmark(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const inputBookmark = new Bookmark();
      inputBookmark.place = req.body.placeId;
      inputBookmark.user = res.locals.userId;
      const bookmarkRepository = getCustomRepository(BookmarkRepository);
      const bookmark = await bookmarkRepository.save(inputBookmark);
      let isBookmarked = false;
      if (bookmark) {
        isBookmarked = true;
      }
      return this.success(req, res)({ isBookmarked });
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  async removeBookmark(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const inputBookmark = new Bookmark();
      inputBookmark.place = req.body.placeId;
      inputBookmark.user = res.locals.userId;
      const bookmarkRepository = getCustomRepository(BookmarkRepository);
      const bookmark = await bookmarkRepository.delete(inputBookmark);
      let isBookmarked = false;
      if (bookmark) {
        isBookmarked = true;
      }
      return this.success(req, res)({ isBookmarked });
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  async getBookmark(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const bookmarkRepository = getCustomRepository(BookmarkRepository);
      const list = await bookmarkRepository
        .createQueryBuilder("bookmark")
        .innerJoinAndMapOne(
          "bookmark.place_id",
          Place,
          "place",
          "place.id = bookmark.place_id",
        )
        .innerJoinAndMapOne(
          "bookmark.price",
          SchedulePriceAttribute,
          "price",
          "place.schedule_price_attribute = price.id",
        )
        .innerJoinAndMapOne(
          "bookmark.photo",
          Photo,
          "photo",
          "place.id = photo.place_id",
        )
        .innerJoinAndMapOne(
          "bookmark.user_id",
          User,
          "user",
          "user.id = bookmark.user_id",
        )
        .where("bookmark.user_id = :userId", { userId: res.locals.userId })
        .getMany();
      // const bookmarkList = await bookmarkRepository.find({
      //   where: { user: res.locals.userId },
      //   relations: ["user", "place"],
      // });\
      return this.success(req, res)({ list });
    } catch (error) {
      next(this.getManagedError(error));
    }
  }
}

const ReviewController = new _ReviewController("REVIEW_CONTROLLER");
export default ReviewController;
