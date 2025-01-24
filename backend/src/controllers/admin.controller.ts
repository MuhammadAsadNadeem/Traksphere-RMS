import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { validate as isUUID } from "uuid";
import adminService from "../services/admin.service";
import { HttpError } from "../utils/errorHandler";
import { StopDto } from "../dto/stop.dto";


const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await adminService.findAllUser();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;


        if (!isUUID(id)) {
            throw new HttpError("Invalid user ID format", StatusCodes.BAD_REQUEST);
        }

        await adminService.deleteUserById(id as string);
        res.status(StatusCodes.OK).json({
            message: "User deleted successfully",

        });
    } catch (error) {
        next(error);
    }
};


const addDriver = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fullName, phoneNumber, cnicNumber } = req.body;

        if (!fullName || !phoneNumber || !cnicNumber) {
            throw new HttpError("All fields are required", StatusCodes.BAD_REQUEST);
        }

        await adminService.addDriver({
            fullName,
            phoneNumber,
            cnicNumber,
        });

        res.status(StatusCodes.CREATED).json({
            message: "Driver created successfully"
        });
    } catch (error) {
        next(error);
    }
};


const deleteDriverById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;


        if (!isUUID(id)) {
            throw new HttpError("Invalid user ID format", StatusCodes.BAD_REQUEST);
        }

        await adminService.deleteDriverById(id as string);
        res.status(StatusCodes.OK).json({
            message: "User deleted successfully",

        });
    } catch (error) {
        next(error);
    }
};

const getAllDrivers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await adminService.findAllDriver();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        next(error);
    }
};


const updateDriverById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;

        if (!isUUID(id)) {
            throw new HttpError("Invalid driver ID format", StatusCodes.BAD_REQUEST);
        }

        const { fullName, phoneNumber, cnicNumber } = req.body;
        if (!fullName && !phoneNumber && !cnicNumber) {
            throw new HttpError("At least one field (fullName, phoneNumber, cnicNumber) is required", StatusCodes.BAD_REQUEST);
        }

        await adminService.updateDriverById(id as string, {
            fullName,
            phoneNumber,
            cnicNumber,
        });

        res.status(StatusCodes.OK).json({
            message: "Driver updated successfully",
            //updatedDriver,
        });
    } catch (error) {
        next(error);
    }
};

const addStop = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { stopName, latitude, longitude } = req.body;

        if (!stopName || !latitude || !longitude) {
            throw new HttpError("stopName, latitude, and longitude are required", StatusCodes.BAD_REQUEST);
        }

        const stopData: StopDto = { stopName, latitude, longitude };

        await adminService.addStop(stopData);

        res.status(StatusCodes.CREATED).json({
            message: "Stop created successfully",
        });
    } catch (error) {
        next(error);
    }
};

const updateStopById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;

        if (!isUUID(id)) {
            throw new HttpError("Invalid stop ID format", StatusCodes.BAD_REQUEST);
        }

        const { stopName, latitude, longitude } = req.body;

        if (!stopName && !latitude && !longitude) {
            throw new HttpError("At least one field (stopName, latitude, longitude) is required", StatusCodes.BAD_REQUEST);
        }

        // const updatedStop = 
        await adminService.updateStopById(id as string, {
            stopName,
            latitude,
            longitude,
        });

        res.status(StatusCodes.OK).json({
            message: "Stop updated successfully",
            //updatedStop,
        });
    } catch (error) {
        next(error);
    }
};


const getAllStops = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stops = await adminService.getAllStops();
        res.status(StatusCodes.OK).json(stops);
    } catch (error) {
        next(error);
    }
};

const deleteStopById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.query;

        if (!isUUID(id)) {
            throw new HttpError("Invalid Stop ID format", StatusCodes.BAD_REQUEST);
        }

        await adminService.deleteStopById(id as string);
        res.status(StatusCodes.OK).json({
            message: "Stop deleted successfully",

        });
    } catch (error) {
        next(error);
    }
};

const addNewRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vehicleNumber, routeName, routeNumber, driverId, busStopIds } = req.body;

        if (!vehicleNumber || !routeName || !routeNumber || !driverId || !busStopIds) {
            throw new HttpError(
                "vehicleNumber, routeName, routeNumber, busStopIds, and driverId are required",
                StatusCodes.BAD_REQUEST
            );
        }

        const newRoute = await adminService.addRoute({
            vehicleNumber,
            routeName,
            routeNumber,
            driverId,
        });
        res.status(StatusCodes.CREATED).json({
            message: "New Route Created successfully",
            newRoute,
        });

    } catch (error) {
        next(error);
    };
}

// const getAllRoutes = async (req: Request, res: Response, next: NextFunction) => {
//     try {

//         const routes = await adminService.getAllRoutes();

//         res.status(StatusCodes.OK).json(routes);
//     } catch (error) {
//         next(error);
//     }
// };

export default {
    getAllUsers,
    deleteUserById,
    addDriver,
    deleteDriverById,
    getAllDrivers,
    updateDriverById,
    addStop,
    updateStopById,
    getAllStops,
    deleteStopById,
    addNewRoute,
    //getAllRoutes,

};
