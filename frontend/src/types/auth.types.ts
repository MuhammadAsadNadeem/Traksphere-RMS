export type LoginType = {
    email: string,
    password: string,
}

export type SignupType = {
    email: string,
    password: string,
    confirmPassword: string,
    code: string,
}

export type ForgotPasswordType = {
    email: string,
    code: string,
}

