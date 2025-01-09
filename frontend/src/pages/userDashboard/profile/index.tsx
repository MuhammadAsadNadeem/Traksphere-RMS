import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "asadnadeem206@gmail.com",
    department: "Computer Science",
    registrationNumber: "123456",
    phoneNumber: "9876543210",
    busNumber: "10",
    stopArea: "Main Square",
  });

  const [profileImage, setProfileImage] = useState<string | null>(
    "https://via.placeholder.com/150"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    console.log("Updated Profile:", profile);
    setIsEditing(false);
  };

  // Handle Image Upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setProfileImage(event.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: { xs: 2, sm: 4 },
        maxWidth: { xs: "100%", sm: 700 },
        margin: "20px auto",
        textAlign: "center",
        borderRadius: 3,
      }}
    >
      <Box position="relative" mb={2}>
        <Avatar
          alt="Profile Picture"
          src={profileImage || "https://via.placeholder.com/150"}
          sx={{
            width: { xs: 80, sm: 100 },
            height: { xs: 80, sm: 100 },
            margin: "0 auto",
          }}
        />
        {isEditing && (
          <Box mt={1}>
            <Button variant="outlined" component="label" size="small">
              Upload Picture
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </Box>
        )}
      </Box>

      {/* Welcome Text */}
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
      >
        Welcome, {profile.fullName}
      </Typography>
      <Typography
        color="gray"
        mb={3}
        sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
      >
        {profile.email}
      </Typography>

      {/* Profile Form */}
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              disabled={!isEditing}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Department"
              name="department"
              value={profile.department}
              onChange={handleChange}
              disabled={!isEditing}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Registration Number"
              name="registrationNumber"
              value={profile.registrationNumber}
              onChange={handleChange}
              disabled={!isEditing}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bus Number"
              name="busNumber"
              value={profile.busNumber}
              onChange={handleChange}
              disabled={!isEditing}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Stop Area"
              name="stopArea"
              value={profile.stopArea}
              onChange={handleChange}
              disabled={!isEditing}
              size="small"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Buttons */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
        {isEditing ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSaveClick}
          >
            Save
          </Button>
        ) : (
          <Button
            variant="contained"
            color="info"
            startIcon={<EditIcon />}
            onClick={handleEditClick}
          >
            Edit Profile
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default Profile;
