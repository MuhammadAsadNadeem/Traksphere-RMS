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
    full_name: string,
    department: string,
    registration_number: string,
    email: string,
    phone_number: string,
    route_no: string,
    stop_area: string,
    gender: string,
    stopArea: string;
}