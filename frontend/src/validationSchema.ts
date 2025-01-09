import * as Yup from "yup";

export const loginSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required."),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required."),
});

export const signUpSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required."),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required."),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm Password is required."),
    code: Yup.string()
        .matches(/^\d{6}$/, "Code must be 6 digits")
        .required("Code is required."),
});

export const userProfileSchema = Yup.object({
    fullname: Yup.string().required("Full Name is required."),
    departmentName: Yup.string().required("Department Name is required."),
    registrationNumber: Yup.string().required("Registration Number is required."),
    phoneNumber: Yup.string()
        .matches(/^\d{11}$/, "Phone number must be 11 digits.")
        .required("Phone number is required."),
    gender: Yup.string().required("Please select a gender."),
    busNumber: Yup.string().required("Bus number is required."),
    stopAddress: Yup.string().required("Stop Area is required."),
});

export const forgotPasswordSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required."),
    code: Yup.string()
        .matches(/^\d{6}$/, "Code must be 6 digits")
        .required("Code is required."),
});


export const changePasswordSchema = Yup.object({
    currentPassword: Yup.string()
        .min(8, "Current password must be at least 8 characters long")
        .required("Current password is required."),
    newPassword: Yup.string()
        .min(8, "New password must be at least 8 characters long")
        .required("New password is required."),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords do not match")
        .required("Confirm password is required."),
});