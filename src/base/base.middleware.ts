import autoBind from "auto-bind";
import { ManagedError } from "../models/error.model";

class BaseMiddleware {
  protected defaultSuccessMsg = "Request success.";
  protected name: string;

  constructor(name: string) {
    this.name = name;
    autoBind(this);
  }

  protected getManagedError(error: unknown): ManagedError {
    return new ManagedError(this.name, error);
  }
}

export default BaseMiddleware;
