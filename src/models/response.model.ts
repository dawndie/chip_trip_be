class ResponsePayload<T> {
  code: number;
  message: string;
  result: ResponseResult<T> | null;

  constructor(
    code: number,
    message: string,
    result: ResponseResult<T> | null = null,
  ) {
    this.code = code;
    this.message = message;
    this.result = result;
  }
}

type ResponseResult<T> = {
  data: T;
  pagination?: Pagination;
};

type Pagination = {
  page: number;
  perPage: number;
  lastPage: number;
  total: number;
};

export { ResponsePayload, Pagination };
