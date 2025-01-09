import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  Container,
  MenuItem,
} from "@mui/material";
import { useFormik, FormikHelpers } from "formik";
import { userProfileSchema } from "../../validationSchema";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { ProfileType } from "../../types/user.types";
import userThunk from "../../store/user/userThunk";
import toaster from "../../utils/toaster";
import { routes } from "../../routes";

const UserProfile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const email = location.state?.email;

  const onSubmit = async (
    values: ProfileType,
    { setSubmitting, resetForm }: FormikHelpers<ProfileType>
  ) => {
    try {
      setSubmitting(true);
      await dispatch(userThunk.updateProfile(values)).unwrap();
      resetForm();
      navigate(routes.login);
    } catch (error) {
      toaster.error(error as string);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      departmentName: "",
      registrationNumber: "",
      phoneNumber: "",
      gender: "",
      busNumber: "",
      stopAddress: "",
      email: email || "",
    },
    validationSchema: userProfileSchema,
    onSubmit,
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const key = e.key;
    if (!/^\d$/.test(key) && key !== "Backspace") {
      e.preventDefault();
    }
  };

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          my: 4,
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: 5,
          borderRadius: 2,
          gap: 2,
        }}
      >
        <Typography variant="h4" align="center" fontWeight="bold">
          Profile
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              name="fullname"
              label="Full Name"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullname && Boolean(formik.errors.fullname)}
              helperText={formik.touched.fullname && formik.errors.fullname}
              fullWidth
              variant="outlined"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              name="departmentName"
              label="Department"
              value={formik.values.departmentName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.departmentName &&
                Boolean(formik.errors.departmentName)
              }
              helperText={
                formik.touched.departmentName && formik.errors.departmentName
              }
              fullWidth
              variant="outlined"
            />
            <TextField
              name="registrationNumber"
              label="Registration No"
              value={formik.values.registrationNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.registrationNumber &&
                Boolean(formik.errors.registrationNumber)
              }
              helperText={
                formik.touched.registrationNumber &&
                formik.errors.registrationNumber
              }
              fullWidth
              variant="outlined"
            />
          </Box>

          <TextField
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            onKeyDown={handleKeyPress}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            fullWidth
            variant="outlined"
            inputProps={{
              maxLength: 11,
            }}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              name="gender"
              label="Gender"
              select
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <TextField
              name="busNumber"
              label="Bus Number"
              select
              value={formik.values.busNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.busNumber && Boolean(formik.errors.busNumber)
              }
              helperText={formik.touched.busNumber && formik.errors.busNumber}
              fullWidth
              variant="outlined"
            >
              {Array.from({ length: 15 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <TextField
            name="stopAddress"
            label="Stop Area"
            value={formik.values.stopAddress}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.stopAddress && Boolean(formik.errors.stopAddress)
            }
            helperText={formik.touched.stopAddress && formik.errors.stopAddress}
            fullWidth
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ p: 1.5 }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default UserProfile;
