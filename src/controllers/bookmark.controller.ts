import express from "express";
import { BaseController } from "../base";
import { BookmarkRepository } from "@/repositories/bookmark.repository";
import { getCustomRepository } from "typeorm";

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

  async removeBookmark(
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
}

const ReviewController = new _ReviewController("REVIEW_CONTROLLER");
export default ReviewController;
