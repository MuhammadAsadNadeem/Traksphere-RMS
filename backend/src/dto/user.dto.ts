
export interface signUpDto {
    email: string,
    password: string,
    code?: string,
};

export interface UserDto {
    email: string,
    fullname: string,
    registrationNumber: string,
    departmentName: string,
    phoneNumber: string,
    busNumber: string,
    gender: string,
    stopAddress: string;
};

export interface UpdateProfileDto {
    fullname?: string;
    phoneNumber?: string;
    departmentName?: string;
    busNumber?: string;
    stopAddress?: string;
    profile_image?: string;

}
