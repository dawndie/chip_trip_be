import { Column, Entity } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "city" })
export class City extends _BaseEntity {
  @Column()
  name: string;
}
