export interface SensorData {
    x: number;
    y: number;
    z: number;
}

export interface BusLocation {
    busNo: string;
    latitude: number;
    longitude: number;
    battery_internal: number;
    battery_external: number;
    accel: SensorData;
    gyro: SensorData;
}
