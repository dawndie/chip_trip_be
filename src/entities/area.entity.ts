import { Column, Entity } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "area" })
export class Area extends _BaseEntity {
  @Column()
  name: string;
}
