import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { validate as isUUID } from "uuid";
import userService from "../services/user.service";
import bcrypt from "bcrypt";
// import mailerService from "../utils/mailerService";
// import redisService from "../utils/redisService";
import { HttpError } from "../utils/errorHandler";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.findAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid ID format." });
      return;
    }

    const user = await userService.findById(id);
    if (user) {
      res.status(StatusCodes.OK).json(user);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found." });
    }
  } catch (error) {
    next(error);
  }
};



const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Current password and new password are required." });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "Current password is incorrect." });
      return;
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const isUpdated = await userService.update(user.id, { password: hashedNewPassword });
    if (!isUpdated) {
      throw new HttpError("Password not updated.", StatusCodes.BAD_REQUEST);
    }

    res.status(StatusCodes.OK).json({ message: "Password updated successfully." });
  } catch (error) {
    next(error);
  }
};


const deleteUserByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.params;

    if (!email) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is required." });
      return;
    }

    const user = await userService.findByEmail(email);

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found." });
      return;
    }

    const result = await userService.deleteUserByEmail(email);
    if (result !== 'User deleted successfully') {
      throw new HttpError("Failed to delete user.", StatusCodes.BAD_REQUEST);
    }

    res.status(StatusCodes.OK).json({ message: result });
  } catch (error) {
    next(error);
  }
};


const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;
    console.log(email)
    const user = await userService.findByEmail(email);
    if (!email) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is required." });
      return;
    }

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "User not found." });
      return;
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const fetchUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    console.log("done", user.id);
    const data = await userService.fetchUserDetails(user.id);
    res.status(StatusCodes.OK).json({ ...data });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllUsers,
  getUserById,
  changePassword,
  getUserByEmail,
  deleteUserByEmail,
  fetchUserData,


};
