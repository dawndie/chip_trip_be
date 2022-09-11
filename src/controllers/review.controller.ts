import express from "express";
import { BaseController } from "../base";
import { ReviewRepository } from "@/repositories/review.repository";
import { getCustomRepository } from "typeorm";
import { Review } from "@/entities/review.entity";
import { Place } from "@/entities/place.entity";
import { User } from "@/entities/user.entity";

class _ReviewController extends BaseController {
  async getReviewsByPlaceId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const reviewRepository = getCustomRepository(ReviewRepository);
      const reviews = await reviewRepository.getReviewByPlaceId(
        parseInt(req.params.id),
      );

      return this.success(req, res)(reviews);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  async createReview(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const place = new Place();
    const user = new User();
    const placeId = parseInt(req.params.id);
    const userId = parseInt(res.locals.userId);
    place.id = placeId;
    user.id = userId;
    const comment = req.body.comment;
    const score = req.body.score;
    const review = new Review();
    review.comment = comment;
    review.score = score;
    review.place = place;
    review.user = user;
    try {
      const reviewRepository = getCustomRepository(ReviewRepository);
      const result = await reviewRepository.save(review);
      return this.success(req, res)(result);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }
}

const ReviewController = new _ReviewController("REVIEW_CONTROLLER");
export default ReviewController;
