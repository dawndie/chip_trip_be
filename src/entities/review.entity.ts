import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { Place } from "@/entities/place.entity";
import { User } from "@/entities/user.entity";
@Entity({ name: "review" })
export class Review extends _BaseEntity {

  @ManyToOne(() => Place, (place) => place.id)
  @JoinColumn({ name: "place_id" })
  place: Place;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "score" })
  score: number;

  @Column({ name: "comment" })
  comment: string;
}
