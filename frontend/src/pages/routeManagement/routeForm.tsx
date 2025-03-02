import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Card,
  Container,
  MenuItem,
} from "@mui/material";

const RouteForm: React.FC = () => {
  const [form, setForm] = useState({
    driverName: "",
    phoneNumber: "",
    vehicleNumber: "",
    routeName: "",
    routeNumber: "",
    busStopNames: ["", "", "", ""],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Handle changes for bus stop names separately
  const handleBusStopChange = (index: number, value: string) => {
    const updatedStops = [...form.busStopNames];
    updatedStops[index] = value;
    setForm((prevForm) => ({ ...prevForm, busStopNames: updatedStops }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`busStopNames${index}`]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.driverName.trim())
      newErrors.driverName = "Driver name is required.";

    if (!form.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{11}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 11 digits.";
    }

    if (!form.vehicleNumber.trim())
      newErrors.vehicleNumber = "Vehicle number is required.";

    if (!form.routeName.trim()) newErrors.routeName = "Route name is required.";

    if (!form.routeNumber) newErrors.routeNumber = "Route number is required.";

    form.busStopNames.forEach((stop, index) => {
      if (!stop.trim()) {
        newErrors[`busStopNames${index}`] = `Bus Stop ${
          index + 1
        } is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Create payload matching your API endpoint
      const payload = {
        vehicleNumber: form.vehicleNumber,
        routeName: form.routeName,
        routeNumber: form.routeNumber,
        driverName: form.driverName,
        busStopNames: form.busStopNames,
      };
      alert("Profile Saved Successfully!");
      console.log("Form Data: ", payload);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: 5,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" fontWeight="bold">
          Add Driver &amp; Route
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            name="driverName"
            label="Driver Name"
            value={form.driverName}
            onChange={handleChange}
            error={!!errors.driverName}
            helperText={errors.driverName}
            fullWidth
            variant="outlined"
          />
          <TextField
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            fullWidth
            variant="outlined"
          />
          <TextField
            name="vehicleNumber"
            label="Vehicle Number"
            value={form.vehicleNumber}
            onChange={handleChange}
            error={!!errors.vehicleNumber}
            helperText={errors.vehicleNumber}
            fullWidth
            variant="outlined"
          />
          <TextField
            name="routeName"
            label="Route Name"
            value={form.routeName}
            onChange={handleChange}
            error={!!errors.routeName}
            helperText={errors.routeName}
            fullWidth
            variant="outlined"
          />
          <TextField
            name="routeNumber"
            label="Route Number"
            select
            value={form.routeNumber}
            onChange={handleChange}
            error={!!errors.routeNumber}
            helperText={errors.routeNumber}
            fullWidth
            variant="outlined"
          >
            {Array.from({ length: 15 }, (_, i) => (
              <MenuItem key={i + 1} value={(i + 1).toString()}>
                {i + 1}
              </MenuItem>
            ))}
          </TextField>
          {form.busStopNames.map((stop, index) => (
            <TextField
              key={index}
              label={`Bus Stop ${index + 1}`}
              value={stop}
              onChange={(e) => handleBusStopChange(index, e.target.value)}
              error={!!errors[`busStopNames${index}`]}
              helperText={errors[`busStopNames${index}`]}
              fullWidth
              variant="outlined"
            />
          ))}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ p: 1.5 }}
          >
            Save
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default RouteForm;
