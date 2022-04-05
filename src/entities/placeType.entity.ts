import { Column, Entity } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "room_type" })
export class PlaceType extends _BaseEntity {
  @Column()
  name: string;
}
