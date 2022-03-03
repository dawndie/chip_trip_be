import express from "express";
import TestController from "./controllers/test.controller";
import UserController from "./controllers/user.controller";
import AuthController from "./controllers/auth.controller";
import { checkJwt } from "./middlewares/checkJwt.middleware";
const router = express.Router();
router.get("/", (req, res) =>
  res.send("Express with Typescript, God of Setup"),
);

const { error, response } = TestController;
const { createAccount, signIn, signUp } = UserController;
const { login } = AuthController;
router.post("/login", login);
router.post("/signup", createAccount);

// router.get("/user/:id", getUser);
router.get("/error", checkJwt, error);
router.get("/response", checkJwt, response);

export default router;
