import { Column, Entity, ManyToMany, JoinTable } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { Role } from "@/entities/role.entity";
@Entity({ name: "permission" })
export class Permission extends _BaseEntity {
  @Column({ name: "title" })
  code: string;

  @Column({ name: "description" })
  discount: number;

  @Column({ name: "active", default: false })
  active: boolean;

  @ManyToMany(() => Role, (role) => role.id)
  role: Promise<Role[]>;
}
