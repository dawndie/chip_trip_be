import express from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { BaseController } from "../base";
import { AppError } from "../models";
import { UserResponse } from "../models/userResponse.model";

// import { validate } from "class-validator";

import { User } from "../entities/user.entity";

class _AuthController extends BaseController {
  async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        console.log(email);

        throw new AppError("Enter email and password", 401);
      }

      const userRepository = getRepository(User);

      let token: string;
      // const user = await userRepository.findOneOrFail({ where: { email } });

      const user = await userRepository
        .createQueryBuilder("user")
        .addSelect("user.password")
        .where({ email: email })
        .getOne();
      if (user) {
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
          throw new AppError("Wrong password", 401);
        }
        if (user) {
          token = jwt.sign(
            { userId: user.id, email: user.email },
            String(process.env.JWT_SECRET),
            { expiresIn: "3h" },
          );
          if (token) {
            const userResponse: UserResponse = {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              address: user.address,
              email: user.email,
              phoneNumber: user.phoneNumber,
              avatar: user.avatar,
            };
            return this.success(req, res)({ token, user: { ...userResponse } });
          }
        }
      } else {
        return this.success(req, res)("Wrong login information");
      }
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  //   static changePassword = async (req: Request, res: Response) => {
  //     //Get ID from JWT
  //     const id = res.locals.jwtPayload.userId;

  //     //Get parameters from the body
  //     const { oldPassword, newPassword } = req.body;
  //     if (!(oldPassword && newPassword)) {
  //       res.status(400).send();
  //     }

  //     //Get user from the database
  //     const userRepository = getRepository(User);
  //     let user: User;
  //     try {
  //       user = await userRepository.findOneOrFail(id);
  //     } catch (id) {
  //       res.status(401).send();
  //     }

  //     //Check if old password matchs
  //     if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
  //       res.status(401).send();
  //       return;
  //     }

  //     //Validate de model (password lenght)
  //     user.password = newPassword;
  //     const errors = await validate(user);
  //     if (errors.length > 0) {
  //       res.status(400).send(errors);
  //       return;
  //     }
  //     //Hash the new password and save
  //     user.hashPassword();
  //     userRepository.save(user);

  //     res.status(204).send();
  //   };
}
const AuthController = new _AuthController("AUTH_CONTROLLER");
export default AuthController;
