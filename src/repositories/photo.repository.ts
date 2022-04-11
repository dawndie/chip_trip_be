import { TypeOrmRepository } from "./base/type-orm.repository";
import { Photo } from "../entities/photo.entity";
import { EntityRepository } from "typeorm";
@EntityRepository(Photo)
export class PhotoRepository extends TypeOrmRepository<Photo> {}
