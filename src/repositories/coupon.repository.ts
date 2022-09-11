import { TypeOrmRepository } from "./base/type-orm.repository";
import { Coupon } from "../entities/coupon.entity";
import { EntityRepository } from "typeorm";
@EntityRepository(Coupon)
export class CouponRepository extends TypeOrmRepository<Coupon> {}
