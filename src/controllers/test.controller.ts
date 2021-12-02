import express from "express";
import { BaseController } from "../base";
import { AppError } from "../models";

class _TestController extends BaseController {
  response(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      return this.success(req, res)({ x: 1, y: 2 });
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  error(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      throw new AppError("Error to display to client");
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const TestController = new _TestController("TEST_CONTROLLER");
export default TestController;
