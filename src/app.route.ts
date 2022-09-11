import express from "express";
import TestController from "./controllers/test.controller";
import UserController from "./controllers/user.controller";
import BookmarkController from "./controllers/bookmark.controller";
import AuthController from "./controllers/auth.controller";
import ReviewController from "./controllers/review.controller";
import PlaceController from "./controllers/place.controller";
import BookingController from "./controllers/booking.controller";
import CouponController from "./controllers/coupon.controller";
import RecommendController from "./controllers/recommend.controller";
import { checkJwt } from "./middlewares/checkJwt.middleware";
const router = express.Router();
router.get("/", (req, res) =>
  res.send("Express with Typescript, God of Setup"),
);

const { getReviewsByPlaceId, createReview } = ReviewController;
const { checkCoupon } = CouponController;
const { error, response } = TestController;
const { createAccount } = UserController;
const {
  getPlaceInformation,
  createPlace,
  getRoomByPlaceAndTotalGuests,
  getRoomByPlaceandTime,
  getRoomByPlace,
  getSuggestions,
  deleteById,
} = PlaceController;
const { createNewBooking, getUserBooking } = BookingController;
const { getRecommend } = RecommendController;
const { login } = AuthController;
const { checkBookmark, createBookmark, removeBookmark, getBookmark } =
  BookmarkController;
//AUTH ROUTER
router.post("/auth/signin", login);
router.post("/auth/signup", createAccount);
//PLACE ROUTER
router.get("/place/:id", getPlaceInformation);
router.get("/place/:id/ratings", getReviewsByPlaceId);
router.post("/place/:id/rating/new", checkJwt, createReview);
router.post("/place/create", checkJwt, createPlace);
router.get(
  "/place/search/:place/:page/:checkin/:checkout/:totalGuests",
  getRoomByPlace,
);
router.get("/place/search/:place/:page/:totalGuests", getRoomByPlaceAndTotalGuests);
router.get("/place/search/:place/:page/:checkin/:checkout", getRoomByPlaceandTime);
router.get("/place/search/:place/:page", getRoomByPlace);
router.post("/place/suggestions", getSuggestions);
router.delete("/place/delete/:id", deleteById);
// BOOKMARK ROUTER
router.post("/bookmark/check", checkJwt, checkBookmark);
router.post("/bookmark/new", checkJwt, createBookmark);
router.delete("/bookmark/remove", checkJwt, removeBookmark);
router.get("/bookmark", checkJwt, getBookmark);
// BOOKING ROUTER
router.post("/booking/new", checkJwt, createNewBooking);
router.get("/booking/user/:id", checkJwt, getUserBooking);
// COUPON ROUTER
router.post("/coupon/apply", checkJwt, checkCoupon);
//CHECK ROUTER
router.get("/error", checkJwt, error);
router.get("/response", checkJwt, response);
// router.get("/user/:id", getUser);

//RECOMMENDER ROUTER
router.get("/recommender/id/:id", checkJwt, getRecommend);
router.get("/recommender/:id", checkJwt, getRecommend);

export default router;
