import { TypeOrmRepository } from "./base/type-orm.repository";
import { EntityRepository } from "typeorm";
import { Booking } from "@/entities/booking.entity";
@EntityRepository(Booking)
export class BookingRepository extends TypeOrmRepository<Booking> {}
