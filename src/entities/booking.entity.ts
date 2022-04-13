import { Column, Entity } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "booking" })
export class User extends _BaseEntity {
  @Column({ name: "start_date" })
  startDate: Date;

  @Column({ name: "end_date" })
  endDate: Date;

  @Column({ name: "status" })
  status: number;

  @Column({ name: "num_of_people" })
  numOfPeople: number;

  @Column({ name: "price" })
  price: number;

  @Column({ name: "coupon" })
  coupon: string;

  @Column({ name: "user_id" })
  userId: number;

  @Column({ unique: true, name: "place_id" })
  placeId: number;
}
