import express from "express";
import TestController from "./controllers/test.controller";
import UserController from "./controllers/user.controller";
import AuthController from "./controllers/auth.controller";
import PlaceController from "./controllers/place.controller";
import { checkJwt } from "./middlewares/checkJwt.middleware";
const router = express.Router();
router.get("/", (req, res) =>
  res.send("Express with Typescript, God of Setup"),
);

const { error, response } = TestController;
const { createAccount } = UserController;
const { getPlaceInformation, getPlaceReview, createPlace } = PlaceController;
const { login } = AuthController;
//AUTH ROUTER
router.post("/auth/signin", login);
router.post("/auth/signup", createAccount);
//PLACE ROUTER
router.get("/place/:id", getPlaceInformation);
router.get("/place/:id/ratings", getPlaceReview);
router.post("/place/create", checkJwt, createPlace);

router.get("/error", checkJwt, error);
router.get("/response", checkJwt, response);
// router.get("/user/:id", getUser);

export default router;
