import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";
import "reflect-metadata";
import router from "./app.route";
import { initEnvironments, initMysqlConnection } from "./app.init";
import LogHelper from "./helpers/log.helper";
import { AppError, ManagedError } from "./models";
import { handleAppError, handleError } from "./middlewares/error.middleware";

// express
const app = express();
initEnvironments();

app.use(cors());
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);
app.use(
  (
    instance: ManagedError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    const { error } = instance;
    if (error instanceof AppError) {
      handleAppError(req, res)(error);
    } else {
      handleError(req, res)(error);
    }
  },
);

setImmediate(async () => {
  try {
    await initMysqlConnection();
    LogHelper.logInfo("Database connected");
  } catch (dbConnectError) {
    let errorMsg = "";
    if (typeof dbConnectError === "string") {
      errorMsg = dbConnectError;
    } else if (dbConnectError && typeof dbConnectError === "object") {
      errorMsg = dbConnectError.toString();
    }
    LogHelper.logError("First start failed to connect to DB", errorMsg);
  }

  app.listen(process.env.APP_PORT, () => {
    LogHelper.logInfo(
      "App listening on",
      `http://localhost:${process.env.APP_PORT}`,
    );
  });
});
