import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../utils/errorHandler';

interface SensorData {
    busNo: string;
    latitude: number;
    longitude: number;
    battery_internal: number;
    battery_external: number;
    accel: {
        x: number;
        y: number;
        z: number;
    };
    gyro: {
        x: number;
        y: number;
        z: number;
    };
}

class LocationService {
    private latestLocation: SensorData | null = null;

    validateAndStore(data: any): SensorData {
        const {
            busNo,
            latitude,
            longitude,
            battery_internal,
            battery_external,
            accel,
            gyro,
        } = data;

        if (
            typeof latitude !== 'number' ||
            typeof longitude !== 'number' ||
            typeof battery_internal !== 'number' ||
            typeof battery_external !== 'number' ||
            typeof accel?.x !== 'number' ||
            typeof accel?.y !== 'number' ||
            typeof accel?.z !== 'number' ||
            typeof gyro?.x !== 'number' ||
            typeof gyro?.y !== 'number' ||
            typeof gyro?.z !== 'number' ||
            typeof busNo !== 'string'
        ) {
            throw new HttpError('Invalid telemetry data format', StatusCodes.BAD_REQUEST);
        }

        const locationData: SensorData = {
            busNo,
            latitude,
            longitude,
            battery_internal,
            battery_external,
            accel,
            gyro,
        };

        this.latestLocation = locationData;
        return locationData;
    }

    getLatestLocation(): SensorData | null {
        return this.latestLocation;
    }
}

export default new LocationService();
