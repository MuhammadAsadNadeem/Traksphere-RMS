import { Router } from "express";
import controller from "../controllers/user.controller";
import authMiddleware from "../middelware/auth.middleware";

const router = Router()
    .use(authMiddleware)
    .get("/", controller.getAllUsers)
    .get("/profile", controller.fetchUserData)
    .get("/:id", controller.getUserById)
    .get("/useremail:email", controller.getUserByEmail)
    .post("/change-password", controller.changePassword)
    .delete("/:email", controller.deleteUserByEmail);

export default router;
