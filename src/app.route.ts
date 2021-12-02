import express from "express";
import TestController from "./controllers/test.controller";

const router = express.Router();

router.get("/", (req, res) =>
  res.send("Express with Typescript, God of Setup"),
);

const { error, response } = TestController;
router.get("/error", error);
router.get("/response", response);

export default router;
