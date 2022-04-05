import { Column, Entity } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "rule_attributes" })
export class RoomAttribute extends _BaseEntity {
  @Column({ name: "repay_time", nullable: true })
  repayTime: number;
}
