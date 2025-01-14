export type ProfileType = {
    id: string,
    email: string,
    fullName: string,
    registrationNumber: string,
    departmentName: string,
    phoneNumber: string,
    routeNumber: string,
    gender: string,
    stopArea: string,
}

export type SignUpPart2 = {
    email: string,
    fullName: string,
    registrationNumber: string,
    departmentName: string,
    phoneNumber: string,
    routeNumber: string,
    gender: string,
    stopArea: string,
}

export type ChangePasswordType = {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
}

export type UpdateProfileType = {
    fullName?: string,
    registrationNumber?: string,
    departmentName?: string,
    phoneNumber?: string,
    routeNumber?: string,
    stopArea?: string,
}

