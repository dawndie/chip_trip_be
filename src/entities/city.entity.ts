import { Column, Entity, ManyToOne } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { Country } from "@/entities/country.entity";

@Entity({ name: "city" })
export class City extends _BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Country, (country) => country.id)
  country: Country;
}
