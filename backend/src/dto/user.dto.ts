export interface UserDto {
    id: string,
    email: string,
    fullName: string,
    registrationNumber: string,
    departmentName: string,
    phoneNumber: string,
    routeNumber: string,
    gender: string,
    stopArea: string;
    isSuperuser: boolean;
};


export interface SignUpDto {
    email: string,
    password: string,
    code?: string,
};

export interface completeSignUpDto {
    email: string,
    fullName: string,
    registrationNumber: string,
    departmentName: string,
    phoneNumber: string,
    routeNumber: string,
    gender: string,
    stopArea: string;
    isSuperuser: boolean;
};

export interface UpdateProfileDto {
    fullName?: string;
    phoneNumber?: string;
    departmentName?: string;
    routeNumber?: string;
    stopArea?: string;
    registrationNumber?: string;

}
