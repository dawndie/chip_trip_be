import { Column, Entity, ManyToOne } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { Place } from "../entities/place.entity";

@Entity({ name: "schedule_price_attributes" })
export class SchedulePriceAttribute extends _BaseEntity {
  @ManyToOne(() => Place, (place) => place.id)
  place: Place;

  @Column({ name: "normal_day_price" })
  normalDayPrice: number;

  @Column({ name: "weekend_price" })
  weekendPrice: number;

  @Column({ name: "cleaning_price" })
  cleaningPrice: number;
}
