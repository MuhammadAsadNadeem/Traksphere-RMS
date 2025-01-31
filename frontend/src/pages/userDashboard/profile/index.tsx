import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Avatar,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import userThunk from "../../../store/thunks/userThunk";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import toaster from "../../../utils/toaster";
import { UpdateProfileType } from "../../../types/user.types";

const Profile: React.FC = () => {
  const userProfile = useAppSelector((state) => state.userSlice.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UpdateProfileType | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await dispatch(userThunk.getProfile()).unwrap();
      } catch (error) {
        toaster.error(error as string);
      }
    };

    if (!userProfile) {
      fetchProfile();
    } else {
      setProfile(userProfile);
    }
  }, [dispatch, userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile!,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleSave = async () => {
    try {
      if (isEditing && profile) {
        await dispatch(userThunk.updateProfile(profile)).unwrap();
        toaster.success("Profile updated successfully!");
      }
    } catch (error) {
      toaster.error(error as string);
    } finally {
      handleToggle();
    }
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    const nameParts = name.split(" ");
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : `${nameParts[0][0] || ""}`;

    return {
      sx: {
        bgcolor: stringToColor(name),
        width: { sm: 100 },
        height: { sm: 100 },
        margin: "0 auto",
      },
      children: initials.toUpperCase(),
    };
  }

  if (!profile) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size="3rem" />;
      </Box>
    );
  }

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
          {...stringAvatar(profile.fullName || "")}
        />
      </Box>

      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
      >
        Welcome, {profile.fullName || ""}
      </Typography>
      <Typography
        color="gray"
        mb={3}
        sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
      >
        {userProfile?.email || ""}
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={profile.fullName || ""}
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
              value={profile.departmentName}
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
              value={profile.routeNumber}
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

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="contained"
          color={isEditing ? "primary" : "info"}
          startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          onClick={handleSave}
        >
          {isEditing ? "Save" : "Edit Profile"}
        </Button>
      </Box>
    </Paper>
  );
};

export default Profile;
