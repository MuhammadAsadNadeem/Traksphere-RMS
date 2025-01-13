import { Router } from "express";
import controller from "../controllers/user.controller";
import authMiddleware from "../middelware/auth.middleware";


const router = Router()
    .use(authMiddleware)
    .get("/", controller.getAllUsers)
    .get("/get-profile", controller.getProfile)
    .post("/update-profile", controller.updateProfile)
    .post("/change-password", controller.changePassword)
    .delete("/:email", controller.deleteUserByEmail)
    .get("/:id", controller.getUserById)
    .get("/useremail:email", controller.getUserByEmail);

export default router;
