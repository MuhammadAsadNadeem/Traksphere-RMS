import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth.service';
import { signUpDto } from '../dto/user.dto';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../utils/errorHandler';
import redisService from "../utils/redisService";
import mailerService from '../utils/mailerService';
import userService from '../services/user.service';
import bcrypt from "bcrypt";

const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, code }: signUpDto = req.body;
        if (!email || !password || !code) {
            throw new HttpError("email, password and code are required", StatusCodes.BAD_REQUEST);
        }
        const { otp }: any = await redisService.getCache(email);

        if (code !== otp) {
            throw new HttpError("Invalid Code!", StatusCodes.BAD_REQUEST);
        }

        await authService.signUp({
            email,
            password,
        });
        await redisService.deleteCache(email);

        res.status(StatusCodes.CREATED).json({
            message: 'User registered successfully', data: { email }
        });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, ...profileData } = req.body;
        const sanitizedEmail = email.trim();
        if (!sanitizedEmail) {
            throw new HttpError("Valid email is required.", StatusCodes.BAD_REQUEST);
        }

        const user = await userService.findByEmail(sanitizedEmail);
        if (!user) {
            throw new HttpError("User not found.", StatusCodes.NOT_FOUND);
        }

        const isUpdated = await userService.update(user.id, profileData);
        if (!isUpdated) {
            throw new HttpError("Profile not updated.", StatusCodes.BAD_REQUEST);
        }

        res.status(StatusCodes.OK).json({ message: "Profile updated." });
    } catch (error) {
        next(error);
    }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new HttpError("email and password are required", StatusCodes.BAD_REQUEST);
        }
        const response = await authService.signIn(email, password);
        res.status(StatusCodes.OK).json({ message: 'Signin successful', data: response });
    } catch (error) {
        next(error);
    }
}

const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.query?.email as string;
        console.log(email)
        if (!email) {
            throw new HttpError("email is required in params", StatusCodes.BAD_REQUEST);
        }
        let { otp }: any = await redisService.getCache(email)
        console.log(otp)
        if (!otp) {
            otp = mailerService.generateOtp();
            await redisService.setCache(email, { otp })
        }
        await mailerService.sendOtpEmail(email, otp)
        res.status(StatusCodes.OK).json({ message: 'Code send successfully' });
    } catch (error) {
        next(error);
    }
}


const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            throw new HttpError("Email and code are required.", StatusCodes.BAD_REQUEST);
        }

        const user = await userService.findByEmail(email);
        if (!user) {
            throw new HttpError("User not found.", StatusCodes.NOT_FOUND);
        }

        const { otp }: any = await redisService.getCache(email);
        if (code !== otp) {
            throw new HttpError("Invalid code.", StatusCodes.BAD_REQUEST);
        }

        const newPassword = mailerService.generatePassword();
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const isUpdated = await userService.update(user.id, { password: hashedPassword });

        if (!isUpdated) {
            throw new HttpError("Password not updated. Try again later.", StatusCodes.BAD_REQUEST);
        }

        await mailerService.sendNewPasswordEmail(email, newPassword);
        await redisService.deleteCache(email);

        res.status(StatusCodes.OK).json({
            message: `Password changed successfully and sent to your email: ${email}`,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    signup,
    updateProfile,
    signin,
    sendOtp,
    forgotPassword,
}