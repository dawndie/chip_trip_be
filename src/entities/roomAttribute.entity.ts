import { Column, Entity } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "room_attributes" })
export class RoomAttribute extends _BaseEntity {
  @Column({ name: "square", nullable: true })
  square: number;

  @Column({ name: "num_of_bedroom", nullable: true })
  numOfBedroom: number;

  @Column({ name: "num_of_bed", nullable: true })
  numOfBed: number;

  @Column({ name: "num_of_bathroom", nullable: true })
  numOfBathroom: number;
}
