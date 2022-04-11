import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { Place } from "@/entities/place.entity";

@Entity({ name: "photo" })
export class Photo extends _BaseEntity {
  @Column()
  url: string;

  @ManyToOne(() => Place, (place) => place.id)
  @JoinColumn({ name: "place_id" })
  place: Place;
}
