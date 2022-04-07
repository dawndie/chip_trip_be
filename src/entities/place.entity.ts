import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  BeforeInsert,
  OneToOne,
  OneToMany,
} from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { User } from "../entities/user.entity";
import { City } from "../entities/city.entity";
import { Area } from "../entities/area.entity";
import { Photo } from "../entities/photo.entity";
import { Country } from "../entities/country.entity";
import { SubmitStatus } from "../entities/submitStatus.entity";
import { Amenity } from "../entities/amenity.entity";
import { Review } from "@/entities/review.entity";
import { PlaceType } from "../entities/placeType.entity";
import { PolicyAttribute } from "../entities/policyAttribute.entity";
import { RoomAttribute } from "../entities/roomAttribute.entity";
import { SchedulePriceAttribute } from "../entities/schedulePriceAttributes.entity";
import { PROCCESSING_STATUS } from "@/const/common.const";
@Entity({ name: "place" })
export class Place extends _BaseEntity {
  @Column()
  name: string;

  @Column({ name: "address" })
  address: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "user_id" })
  host: User;

  @ManyToOne(() => City, (city) => city.id)
  @JoinColumn({ name: "city_id" })
  city: City;

  @ManyToOne(() => Area, (area) => area.id)
  @JoinColumn({ name: "area_id" })
  area: Area;

  @ManyToOne(() => Country, (country) => country.id)
  @JoinColumn({ name: "country_id" })
  country: Country;

  @ManyToOne(() => SubmitStatus, (submitStatus) => submitStatus.id)
  @JoinColumn({ name: "submit_status_id" })
  submitStatus: SubmitStatus;

  @ManyToMany(() => Amenity, (amenity) => amenity.places, { cascade: true })
  @JoinTable()
  amenities: Promise<Amenity[]>;

  @OneToMany(() => Review, (review) => review.id)
  reviews: Review[];

  @OneToMany(() => Photo, (photo) => photo.id)
  photos: Photo[];

  @ManyToOne(() => PlaceType, (placeType) => placeType.id)
  @JoinColumn({ name: "place_type_id" })
  placeType: PlaceType;

  @OneToOne(() => PolicyAttribute, { cascade: true })
  @JoinColumn({ name: "policy_attribute" })
  policyAttribute: PolicyAttribute;

  @OneToOne(() => RoomAttribute, { cascade: true })
  @JoinColumn({ name: "room_attribute" })
  roomAttribute: RoomAttribute;

  @OneToOne(() => SchedulePriceAttribute, { cascade: true })
  @JoinColumn({ name: "schedule_price_attribute" })
  schedulePriceAttribute: SchedulePriceAttribute;

  @Column({ name: "detail" })
  detail: string;

  @BeforeInsert()
  beforeInsertActions() {
    const proccessingStatus = new SubmitStatus();
    proccessingStatus.id = PROCCESSING_STATUS.id;
    this.submitStatus = proccessingStatus;
  }
}
