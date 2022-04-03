import {
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class TypeOrmEntity {
  @PrimaryColumn({ name: "id" })
  id!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @DeleteDateColumn({ name: "deleted_at" })
  deletedAt: Date | null = null;

  @BeforeInsert()
  protected beforeInsert(): void {
    this.id = this.generateID();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  protected generateID(): string {
    const bodyPart = Math.random().toString(36).substr(2, 9);
    const tailPart = Math.random().toString(16).substr(2, 5);
    return `${this.idPrefix}-${bodyPart}-${tailPart}`;
  }

  abstract get idPrefix(): string;
}
