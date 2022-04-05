import express from "express";
import { BaseController } from "../base";
import { AppError } from "../models";
import { User } from "../entities/user.entity";
import { UserResponse } from "../models/userResponse.model";
import bcrypt from "bcrypt";
class _UserController extends BaseController {
  async createAccount(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { firstName, lastName, email, phoneNumber } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    try {
      const user = User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      });
      await user.save();

      const userResponse: UserResponse = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        email: user.email,
        phoneNumber: user.phoneNumber,
        avatar: user.avatar,
      };
      return this.success(req, res)({ ...userResponse });
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  // async getUser(
  //   req: express.Request,
  //   res: express.Response,
  //   next: express.NextFunction,
  // ) {
  //   const { id } = req.params;
  //   try {
  //     let user = await User.findOne(parseInt(id));
  //     if (user) {
  //       const flag = await bcrypt.compare(user.password, );
  //       return this.success(req, res)({ user });
  //     }
  //   } catch (err) {
  //     next(this.getManagedError(err));
  //   }
  // }

  // encodedToken() {
  //   return sign();
  // }

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

const UserController = new _UserController("USER_CONTROLLER");
export default UserController;
