import { codeCommonFailed } from "@/const/ba-code.const";

class AppError extends Error {
  public code: number;
  public message: string;
  public baCode: number;

  constructor(message: string, code = 500, baCode = codeCommonFailed) {
    super();
    this.code = code;
    this.message = message;
    this.baCode = baCode;
  }
}

class ManagedError {
  public origin: string;
  public error: unknown;

  constructor(origin: string, error: unknown) {
    this.origin = origin;
    this.error = error;
  }
}

export { AppError, ManagedError };
