import { Column, Entity, ManyToOne } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { Place } from "../entities/place.entity";

@Entity({ name: "room_attributes" })
export class RoomAttribute extends _BaseEntity {
  @ManyToOne(() => Place, (place) => place.id)
  place: Place;

  @Column({ name: "square", nullable: true })
  square: number;

  @Column({ name: "num_of_bedroom", nullable: true })
  numOfBedroom: number;

  @Column({ name: "num_of_bed", nullable: true })
  numOfBed: number;

  @Column({ name: "num_of_bathroom", nullable: true })
  numOfBathroom: number;
}
