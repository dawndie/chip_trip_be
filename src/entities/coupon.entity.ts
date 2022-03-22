import { Column, Entity } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "coupon" })
export class User extends _BaseEntity {
  @Column({ name: "code" })
  code: string;

  @Column({ name: "discount" })
  discount: number;

 
}