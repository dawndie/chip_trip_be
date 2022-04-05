import { Column, Entity, ManyToOne } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "schedule_price_attributes" })
export class SchedulePriceAttribute extends _BaseEntity {

  @Column({ name: "normal_day_price", nullable: true })
  normalDayPrice: number;

  @Column({ name: "weekend_price", nullable: true })
  weekendPrice: number;

  @Column({ name: "cleaning_price", nullable: true })
  cleaningPrice: number;
}
