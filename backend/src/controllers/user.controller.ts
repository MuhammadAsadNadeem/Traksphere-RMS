import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { validate as isUUID } from "uuid";
import userService from "../services/user.service";
import bcrypt from "bcrypt";
import { UpdateProfileDto } from '../dto/user.dto';
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
      throw new HttpError("Invalid ID format.", StatusCodes.BAD_REQUEST);
    }

    const user = await userService.findById(id);
    if (user) {
      res.status(StatusCodes.OK).json(user);
    } else {
      throw new HttpError("User not found.", StatusCodes.NOT_FOUND);
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
      throw new HttpError("Current password and new password are required.", StatusCodes.BAD_REQUEST);
    }

    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatch) {
      throw new HttpError("Current password is incorrect.", StatusCodes.UNAUTHORIZED);
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
      throw new HttpError("Email is required.", StatusCodes.BAD_REQUEST);

    }

    const user = await userService.findByEmail(email);

    if (!user) {
      throw new HttpError("User not found.", StatusCodes.NOT_FOUND);
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
      throw new HttpError("Email is required.", StatusCodes.BAD_REQUEST);
    }

    if (!user) {
      throw new HttpError("User not found.", StatusCodes.NOT_FOUND);
    }

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const data = await userService.fetchUserDetails(user.id);
    res.status(StatusCodes.OK).json({ ...data });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const profileData: UpdateProfileDto = req.body;
    const isUpdated = await userService.update(user.id, profileData);

    if (!isUpdated) {
      throw new HttpError("Profile not updated. Please try again.", StatusCodes.BAD_REQUEST);
    }

    res.status(StatusCodes.OK).json({ message: "Profile updated successfully." });

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
  getProfile,
  updateProfile,

};
