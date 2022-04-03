import { Column, Entity, ManyToOne } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { Place } from "../entities/place.entity";

@Entity({ name: "policy_attributes" })
export class PolicyAttribute extends _BaseEntity {
  @ManyToOne(() => Place, (place) => place.id)
  place: Place;

  @Column({ name: "max_num_of_people", nullable: true })
  maxNumOfPeople: number;

  @Column({ name: "currency", nullable: true })
  currency: string;
}
