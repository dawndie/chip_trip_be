import { Column, Entity } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "recommend" })
export class Recommend extends _BaseEntity {
  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "place_id" })
  placeId: string;
}
