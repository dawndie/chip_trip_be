import { Column, Entity, ManyToMany } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { Place } from "@/entities/place.entity";
@Entity({ name: "amenity" })
export class Amenity extends _BaseEntity {
  @Column()
  name: string;

  @ManyToMany(() => Place, (place) => place.amenities)
  places: Promise<Place[]>;
}
