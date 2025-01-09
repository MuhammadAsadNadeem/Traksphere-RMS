import { Router } from "express";
import controller from "../controllers/auth.controller";

const router = Router()

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.get("/send-otp", controller.sendOtp);
router.post("/forgot-password", controller.forgotPassword);
router.post("/complete-signup", controller.updateProfile);



export default router;
