import autoBind from "auto-bind";
import express from "express";
import { ManagedError } from "../models/error.model";
import { Pagination, ResponsePayload } from "../models/response.model";

class BaseController {
  protected defaultSuccessMsg = "Request success.";
  protected name: string;

  constructor(name: string) {
    this.name = name;
    autoBind(this);
  }

  protected success<T>(req: express.Request, res: express.Response) {
    return (data?: T, message?: string): void => {
      const finalMessage = message || this.defaultSuccessMsg;
      const finalData = data ? { data } : null;
      const responsePayload = new ResponsePayload<T>(
        1000,
        finalMessage,
        finalData,
      );
      res.status(200).send(responsePayload);
    };
  }

  protected paginate<T>(req: express.Request, res: express.Response) {
    return (data: T, pagination: Pagination, message?: string): void => {
      const finalMessage = message || this.defaultSuccessMsg;
      const responsePayload = new ResponsePayload<T>(1000, finalMessage, {
        data,
        pagination,
      });
      res.status(200).send(responsePayload);
    };
  }

  protected getManagedError(error: unknown): ManagedError {
    return new ManagedError(this.name, error);
  }
}

export default BaseController;
