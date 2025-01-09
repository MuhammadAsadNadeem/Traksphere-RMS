import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import {
  FaBus,
  FaRegClock,
  FaMapMarkedAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

const UserDashboard = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right,rgb(11, 47, 104),rgb(67, 28, 210),rgb(55, 126, 206))",
        borderRadius: "8px",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome here
          </Typography>
          <Typography variant="h6" fontWeight="normal" mb={2} mx={4}>
            We’re glad to have you on board. Here's a quick guide to how the app
            works
          </Typography>
        </Box>

        <Paper
          sx={{
            width: "100%",
            maxWidth: "95%",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="primary" mb={4}>
            What Our App Does
          </Typography>
          <Typography variant="body1" mb={6}>
            The app helps you manage your daily commute by providing real-time
            information about bus routes, schedules, driver details, and more.
            It's your go-to tool for a smooth and reliable journey.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {/* Feature 1 - View Routes */}
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  padding: 4,
                  backgroundColor: "primary.main",
                  color: "white",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <IconButton sx={{ fontSize: 40, mb: 2 }}>
                  <FaBus />
                </IconButton>
                <Typography variant="h6" fontWeight="bold">
                  View Routes
                </Typography>
                <Divider sx={{ my: 2, borderColor: "grey.300" }} />
                <Typography variant="body2" mt={2}>
                  Access all available bus routes and view details like stops
                  and schedules.
                </Typography>
              </Paper>
            </Grid>

            {/* Feature 2 - Check Schedule */}
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  padding: 4,
                  backgroundColor: "primary.main",
                  color: "white",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <IconButton sx={{ fontSize: 40, mb: 2 }}>
                  <FaRegClock />
                </IconButton>
                <Typography variant="h6" fontWeight="bold">
                  Check Schedule
                </Typography>
                <Divider sx={{ my: 2, borderColor: "grey.300" }} />
                <Typography variant="body2" mt={2}>
                  Know exactly when your bus will arrive and plan your day
                  ahead.
                </Typography>
              </Paper>
            </Grid>

            {/* Feature 3 - View Bus Location */}
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  padding: 4,
                  backgroundColor: "primary.main",
                  color: "white",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <IconButton sx={{ fontSize: 40, mb: 2 }}>
                  <FaMapMarkedAlt />
                </IconButton>
                <Typography variant="h6" fontWeight="bold">
                  Real-Time Bus Location
                </Typography>
                <Divider sx={{ my: 2, borderColor: "grey.300" }} />
                <Typography variant="body2" mt={2}>
                  Track buses in real-time and never miss your ride again.
                </Typography>
              </Paper>
            </Grid>

            {/* Feature 4 - Report Complaints */}
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  padding: 4,
                  backgroundColor: "primary.main",
                  color: "white",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <IconButton sx={{ fontSize: 40, mb: 2 }}>
                  <FaExclamationTriangle />
                </IconButton>
                <Typography variant="h6" fontWeight="bold">
                  Report Complaints
                </Typography>
                <Divider sx={{ my: 2, borderColor: "grey.300" }} />
                <Typography variant="body2" mt={2}>
                  Have an issue? Log complaints to help improve bus services.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserDashboard;
