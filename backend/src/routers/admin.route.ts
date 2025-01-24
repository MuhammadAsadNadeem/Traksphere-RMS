import { Router } from "express";
import controller from "../controllers/admin.controller";
import authMiddleware from "../middelware/auth.middleware";
import adminMiddleware from "../middelware/admin.middleware";

const router = Router()
    .use(authMiddleware)
    .use(adminMiddleware)
    .get("/get-user", controller.getAllUsers)
    .delete("/delete-user", controller.deleteUserById)
    .post("/add-driver", controller.addDriver)
    .get("/get-driver", controller.getAllDrivers)
    .put("/update-driver", controller.updateDriverById)
    .delete("/delete-driver", controller.deleteDriverById)
    .post("/add-stop", controller.addStop)
    .get("/get-stop", controller.getAllStops)
    .put("/update-stop", controller.updateStopById)
    .delete("/delete-stop", controller.deleteStopById)
    .post("/add-route", controller.addNewRoute)
//.get("/get-routes", controller.getAllRoutes)

export default router;
