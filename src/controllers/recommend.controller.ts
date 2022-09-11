import express from "express";
import { BaseController } from "../base";
import { RecommendRepository } from "@/repositories/recommend.repository";
import { PlaceRepository } from "@/repositories/place.repository";
import { getCustomRepository } from "typeorm";
import { Place } from "@/entities/place.entity";
class _RecommendedController extends BaseController {
  async getRecommend(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const userId = res.locals.userId;
    try {
      const recommendRepository = getCustomRepository(RecommendRepository);
      const records = await recommendRepository.find({
        where: { userId: userId },
      });
      const placeRepository = getCustomRepository(PlaceRepository);
      const placeList: Place[] = [];
      for (let i = 0; i < records.length; i++) {
        console.log(records[i].placeId);
        const place = await placeRepository.getPlacePreview(
          parseInt(records[i].placeId),
        );
        if (place) {
          placeList.push(place);
        }
      }
      return this.success(req, res)(placeList);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }
}
const RecommendController = new _RecommendedController("RECOMMEND_CONTROLLER");
export default RecommendController;
