export type BusStopType = {
    id: string,
    stopName: string,
    latitude?: number,
    longitude?: number,

}
export type Loaction = {
    stopName: string,
    latitude: number,
    longitude: number,

}

export type UpdateBusStopType = {
    id: string,
    stopName?: string,
    latitude?: number,
    longitude?: number,

}