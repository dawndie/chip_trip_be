import { Column, Entity, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { User } from "../entities/user.entity";
import { City } from "../entities/city.entity";
import { Area } from "../entities/area.entity";
import { Country } from "../entities/country.entity";
import { SubmitStatus } from "../entities/submitStatus.entity";
import { Amenity } from "../entities/amenity.entity";
@Entity({ name: "place" })
export class Place extends _BaseEntity {
  @Column()
  name: string;

  @Column({ name: "address" })
  address: string;

  @ManyToOne(() => User, (user) => user.id)
  host: User;

  @ManyToOne(() => City, (city) => city.id)
  city: City;

  @ManyToOne(() => Area, (area) => area.id)
  area: Area;

  @ManyToOne(() => Country, (country) => country.id)
  country: Country;

  @ManyToOne(() => SubmitStatus, (submitStatus) => submitStatus.id)
  submitStatus: SubmitStatus;

  @ManyToMany(() => Amenity)
  @JoinTable()
  amenities: Amenity[];

  @Column({ name: "place_type" })
  palceType: string;

  @Column({ name: "detail" })
  detail: string;
}
