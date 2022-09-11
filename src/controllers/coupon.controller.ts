import express from "express";
import { BaseController } from "../base";
import { CouponRepository } from "@/repositories/coupon.repository";
import { getCustomRepository } from "typeorm";

class _CouponController extends BaseController {
  async checkCoupon(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const couponRepository = getCustomRepository(CouponRepository);
    const coupon = await couponRepository.findOne({
      where: { code: req.body.code_name },
    });

    if (coupon) {
      if (coupon.isUsed === true) {
        return res.status(422).send({ error: "Coupon is used" });
      }

      coupon.isUsed = false;
      await couponRepository.update(coupon.id, coupon);
      return this.success(req, res)(coupon);
    }
    return res.status(400).send({ error: "can't find coupon" });
  }
}

const CouponController = new _CouponController("BOOKING_CONTROLLER");
export default CouponController;
