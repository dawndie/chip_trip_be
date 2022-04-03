import { Column, Entity } from "typeorm";
import { _BaseEntity } from "../base/base.entity";

@Entity({ name: "submit_status" })
export class SubmitStatus extends _BaseEntity {
  @Column({ name: "name" })
  name: string;
}
