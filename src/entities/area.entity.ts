import { Column, Entity, ManyToOne } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { City } from "@/entities/city.entity";
@Entity({ name: "area" })
export class Area extends _BaseEntity {
  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => City, (city) => city.id)
  city: City;
}
