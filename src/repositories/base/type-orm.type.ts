export interface TypeOrmPaginator<T> {
  data: T[];
  page: number;
  limit: number;
  lastPage: number;
  total: number;
}
