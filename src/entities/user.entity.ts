import { Column, Entity, OneToMany } from "typeorm";
import { _BaseEntity } from "../base/base.entity";
import { Review } from "@/entities/review.entity";
import bcrypt from "bcrypt";

@Entity({ name: "user" })
export class User extends _BaseEntity {
  @Column({ name: "first_name" })
  firstName: string;

  @Column({ name: "last_name" })
  lastName: string;

  @Column({ default: true, name: "active" })
  isActive: boolean;

  @Column({ name: "password", select: false })
  password: string;

  @Column({ name: "phone_number" })
  phoneNumber: string;

  @Column({ name: "avatar", default: "" })
  avatar: string;

  @Column({ name: "address", nullable: true })
  address: string;

  @Column({ unique: true, name: "email" })
  email: string;

  @Column({ type: "simple-json", nullable: true, name: "additional_info" })
  additionalInfo: {
    age: number;
    interest: string;
  };

  @OneToMany(() => Review, (review) => review.id)
  reviews: Review[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
