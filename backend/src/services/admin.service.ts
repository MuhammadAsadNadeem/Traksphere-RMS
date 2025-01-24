import db from "../db";
import { Repository, In } from "typeorm";
import { User } from "../entities/user.entity";
import { Driver } from "../entities/driver.entity";
import { BusStop } from "../entities/stop.entity";
import { HttpError } from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import { StopDto } from "../dto/stop.dto";
import { DriverDto } from "../dto/driver.dto";
import { RouteDto } from "../dto/route.dto";
import { Route } from "../entities/route.entity";

export class AdminService {
    private userRepository: Repository<User>;
    private driverRepository: Repository<Driver>
    private busStopRepository: Repository<BusStop>
    private routeRepository: Repository<Route>

    constructor() {
        this.userRepository = db.user;
        this.driverRepository = db.driver
        this.busStopRepository = db.busStop
        this.routeRepository = db.route
    }

    async findAllUser(): Promise<User[]> {

        const users = await this.userRepository.find({
            select: [
                "id",
                "fullName",
                "departmentName",
                "registrationNumber",
                "email",
                "phoneNumber",
                "routeNumber",
                "gender",
                "stopArea",
                "isSuperuser",
            ],
            where: { isSuperuser: false },
        });
        return users

    }



    async deleteUserById(id: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new HttpError("User not found", StatusCodes.NOT_FOUND);
        }

        await this.userRepository.delete(id);
        return user;
    }


    async addDriver(driverData: Partial<Driver>): Promise<Driver> {
        const { cnicNumber } = driverData;

        const existingDriver = await this.driverRepository.findOne({
            where: { cnicNumber },
        });

        if (existingDriver) {
            throw new HttpError("Driver with this CNIC number already exists", StatusCodes.CONFLICT);
        }

        const newDriver = this.driverRepository.create(driverData);
        return await this.driverRepository.save(newDriver);
    }


    async deleteDriverById(id: string): Promise<Driver> {
        const driver = await this.driverRepository.findOneBy({ id });

        if (!driver) {
            throw new HttpError("Driver not found", StatusCodes.NOT_FOUND);
        }

        await this.driverRepository.delete(id);
        return driver;
    }

    async findAllDriver(): Promise<Driver[]> {

        const drivers = await this.driverRepository.find({
            select: [
                "id",
                "fullName",
                "phoneNumber",
                "cnicNumber",

            ],

        });
        return drivers

    }

    async updateDriverById(id: string, driverData: DriverDto): Promise<Driver> {
        const driver = await this.driverRepository.findOneBy({ id });

        if (!driver) {
            throw new HttpError("Driver not found", StatusCodes.NOT_FOUND);
        }

        driver.fullName = driverData.fullName || driver.fullName;
        driver.phoneNumber = driverData.phoneNumber || driver.phoneNumber;
        driver.cnicNumber = driverData.cnicNumber || driver.cnicNumber;

        await this.driverRepository.save(driver);
        return driver;
    }

    async addStop(stopData: StopDto): Promise<BusStop> {
        const { stopName, latitude, longitude } = stopData;

        if (!stopName || !latitude || !longitude) {
            throw new HttpError("Stop name, latitude, and longitude are required", StatusCodes.BAD_REQUEST);
        }

        const existingStop = await this.busStopRepository.findOne({
            where: { stopName },
        });

        if (existingStop) {
            throw new HttpError("Stop with this name already exists", StatusCodes.CONFLICT);
        }

        const newStop = this.busStopRepository.create(stopData);
        return await this.busStopRepository.save(newStop);
    }

    async updateStopById(id: string, stopData: StopDto): Promise<BusStop> {
        const stop = await this.busStopRepository.findOneBy({ id });

        if (!stop) {
            throw new HttpError("Stop not found", StatusCodes.NOT_FOUND);
        }

        stop.stopName = stopData.stopName || stop.stopName;
        stop.latitude = stopData.latitude || stop.latitude;
        stop.longitude = stopData.longitude || stop.longitude;

        await this.busStopRepository.save(stop);
        return stop;
    }

    async getAllStops(): Promise<BusStop[]> {
        try {
            const stops = await this.busStopRepository.find({
                select: ["id", "stopName", "latitude", "longitude"],
            });
            return stops;
        } catch (error) {
            throw new HttpError("Error fetching stops", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteStopById(id: string): Promise<BusStop> {
        const stop = await this.busStopRepository.findOneBy({ id });

        if (!stop) {
            throw new HttpError("Stop not found", StatusCodes.NOT_FOUND);
        }

        await this.busStopRepository.delete(id);
        return stop;
    }

    async addRoute(data: any) {
        const { vehicleNumber, routeName, routeNumber, driverId, busStops } = data;

        const existingRoute = await this.routeRepository.findOne({
            where: { vehicleNumber },
        });
        if (existingRoute) {
            throw new HttpError("A route with this vehicle number already exists.", StatusCodes.BAD_REQUEST);
        }

        const existingDriverRoute = await this.routeRepository.findOne({
            where: { driver: { id: driverId } },
        });
        if (existingDriverRoute) {
            throw new HttpError("This driver is already assigned to another route.", StatusCodes.BAD_REQUEST);
        }

        const driver = await this.driverRepository.findOne({ where: { id: driverId } });
        if (!driver) {
            throw new HttpError("Driver with the specified ID not found.", StatusCodes.NOT_FOUND);
        }

        const newRoute = this.routeRepository.create({
            vehicleNumber,
            routeName,
            routeNumber,
            driver,
        });

        await this.routeRepository.save(newRoute);

        const routes = new Route();
        routes.busStops = busStops;

        await this.routeRepository.save(routes);

        return {
            id: newRoute.id,
            vehicleNumber: newRoute.vehicleNumber,
            routeName: newRoute.routeName,
            routeNumber: newRoute.routeNumber,
            driverName: driver.fullName,
            driverPhoneNumber: driver.phoneNumber,
        };
    }


}

export default new AdminService();
