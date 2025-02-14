export type CountsResponse = {

    totalUsers: number,
    totalBusStops: number,
    totalRoutes: number,
    totalDrivers: number
}

export type BusStopResponse = {
    id: string,
    stopName: string,
    latitude: number,
    longitude: number,

}

export type UserResponse = {
    id: string,
    email: string,
    fullName: string,
    registrationNumber: string,
    departmentName: string,
    phoneNumber: string,
    routeNumber: string,
    gender: string,
    stopArea: string;
}

export type UpdateUserType = {
    id: string,
    email?: string,
    fullName?: string,
    registrationNumber?: string,
    departmentName?: string,
    phoneNumber?: string,
    routeNumber?: string,
    gender?: string,
    stopArea?: string;
}

export type DriverResponse = {
    id: string,
    fullName: string;
    phoneNumber: string;
    cnicNumber: string;
}

