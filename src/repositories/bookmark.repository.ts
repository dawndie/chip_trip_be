import { TypeOrmRepository } from "./base/type-orm.repository";
import { Bookmark } from "../entities/bookmark.entity";
import { EntityRepository } from "typeorm";
@EntityRepository(Bookmark)
export class BookmarkRepository extends TypeOrmRepository<Bookmark> {}
