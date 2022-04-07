import express from "express";
import { BaseController } from "../base";
import { ReviewRepository } from "@/repositories/review.repository";
import { getCustomRepository } from "typeorm";

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
      console.log(this.success(req, res)(reviews));

      return this.success(req, res)(reviews);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }
}

const ReviewController = new _ReviewController("REVIEW_CONTROLLER");
export default ReviewController;
