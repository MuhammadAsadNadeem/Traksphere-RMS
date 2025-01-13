
export interface signUpDto {
    email: string,
    password: string,
    code?: string,
};

export interface UserDto {
    email: string,
    fullName: string,
    registrationNumber: string,
    departmentName: string,
    phoneNumber: string,
    routeNumber: string,
    gender: string,
    stopArea: string;
};

export interface UpdateProfileDto {
    fullName?: string;
    phoneNumber?: string;
    departmentName?: string;
    routeNumber?: string;
    stopArea?: string;
    registrationNumber?: string;

}
