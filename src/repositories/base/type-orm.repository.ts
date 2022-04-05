import { _BaseEntity } from "@/base/base.entity";
import { FindManyOptions, Repository, FindOneOptions } from "typeorm";
// import { TypeOrmEntity } from "./type-orm.entity";
import { TypeOrmPaginator } from "./type-orm.type";

export abstract class TypeOrmRepository<
  E extends _BaseEntity,
> extends Repository<E> {
  async findById(id: number, option?: FindOneOptions<E>): Promise<E | undefined> {
    const record = await this.findOne(id, option);
    return record;
  }

  async paginate(
    page = 1,
    limit = 20,
    options?: FindManyOptions<E>,
  ): Promise<TypeOrmPaginator<E>> {
    const skip = (page - 1) * limit;
    const [records, count] = await this.findAndCount({
      skip,
      take: limit,
      ...options,
    });
    const lastPage = count < limit ? 1 : Math.ceil(count / limit);

    return {
      data: records,
      page,
      limit,
      lastPage,
      total: count,
    };
  }
}
