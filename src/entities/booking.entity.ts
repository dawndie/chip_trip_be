import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { Place } from "./place.entity";
import { User } from "./user.entity";

@Entity({ name: "booking" })
export class Booking extends _BaseEntity {
  @Column({ name: "start_date" })
  startDate: Date;

  @Column({ name: "end_date" })
  endDate: Date;

  @Column({ name: "status", default: "done" })
  status: string;

  @Column({ name: "num_of_people" })
  numOfPeople: number;

  @Column({ name: "price", default: 0 })
  price: number;

  @Column({ name: "coupon" })
  coupon: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Place, (place) => place.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "place_id" })
  place: Place;
}
