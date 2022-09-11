import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { Place } from "@/entities/place.entity";
import { User } from "@/entities/user.entity";
@Entity({ name: "bookmark" })
export class Bookmark extends _BaseEntity {
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Place, (place) => place.id, {onDelete: "CASCADE"})
  @JoinColumn({ name: "place_id" })
  place: Place;
}
