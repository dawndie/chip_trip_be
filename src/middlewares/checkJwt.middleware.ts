import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  let bearerToken = "";
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    try {
      const jwtPayload = <any>(
        jwt.verify(bearerToken, String(process.env.JWT_SECRET))
      );
      res.locals.userId = String(jwtPayload.userId);
      next();
    } catch (e) {
      res.send({ code: 9000, result: null, message: e });
    }
  } else {
    res.send({ code: 9000, result: null, message: "Invalid token" });
  }

  //The token is valid for 3 hour
  //We want to send a new token on every request
  // const { userId, email } = jwtPayload;
  // const newToken = jwt.sign({ userId, email }, String(process.env.JWT_SECRET), {
  //   expiresIn: "3h",
  // });
  // res.setHeader("token", newToken);

  // //Call the next middleware or controller
  // next();
};
