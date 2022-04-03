import { Column, Entity } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "amenity" })
export class Amenity extends _BaseEntity {
  @Column()
  name: string;
}
