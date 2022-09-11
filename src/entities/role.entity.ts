import { Column, Entity, ManyToMany, JoinTable } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { Permission } from "./permission.entity";

@Entity({ name: "Role" })
export class Role extends _BaseEntity {
  @Column({ name: "title" })
  code: string;

  @Column({ name: "description" })
  discount: number;

  @Column({ name: "active", default: false })
  active: boolean;

  @ManyToMany(() => Permission, (permission) => permission.role, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinTable()
  permission: Promise<Permission[]>;
}
