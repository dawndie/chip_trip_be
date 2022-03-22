import { Column, Entity } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "bookmark" })
export class User extends _BaseEntity {
  @Column({ name: "user" })
  user: number;

  @Column({ name: "place" })
  place: number;

 
}
