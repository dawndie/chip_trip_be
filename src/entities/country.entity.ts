import { Column, Entity } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "country" })
export class Country extends _BaseEntity {
  @Column()
  name: string;
}
