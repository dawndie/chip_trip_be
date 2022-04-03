import { Column, Entity } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "review" })
export class User extends _BaseEntity {
  @Column({ name: "user" })
  user: number;

  @Column({ name: "place" })
  place: number;

  @Column({ name: "score" })
  score: number;

  @Column({ name: "comment" })
  comment: string;



 
}
