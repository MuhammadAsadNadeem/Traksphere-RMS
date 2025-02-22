import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  FaBus,
  FaRegClock,
  FaMapMarkedAlt,
  FaExclamationTriangle,
} from "react-icons/fa";

const UserDashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        mt: 6,
        ml: 2,
        mr: 2,
        mb: 2,
        minHeight: "95vh",
        background: "linear-gradient(to right, #0b2f68, #431cd2, #377ece)",
        borderRadius: "8px",
        color: "white",
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

          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            {[
              {
                icon: <FaBus />,
                title: "View Routes",
                description:
                  "Access all available bus routes and view details like stops and schedules.",
              },
              {
                icon: <FaRegClock />,
                title: "Check Schedule",
                description:
                  "Know exactly when your bus will arrive and plan your day ahead.",
              },
              {
                icon: <FaMapMarkedAlt />,
                title: "Real-Time Location",
                description:
                  "Track buses in real-time and never miss your ride again.",
              },
              {
                icon: <FaExclamationTriangle />,
                title: "Report Complaints",
                description:
                  "Have an issue? Log complaints to help improve bus services.",
              },
            ].map((item, index) => (
              <Paper
                key={index}
                sx={{
                  padding: 4,
                  backgroundColor: "primary.main",
                  color: "white",
                  borderRadius: 2,
                  textAlign: "center",
                  flex: isMobile ? "1 1 100%" : "1 1 calc(25% - 32px)",
                  minWidth: "250px",
                }}
              >
                <IconButton sx={{ fontSize: 40, mb: 2 }}>
                  {item.icon}
                </IconButton>
                <Typography variant="h6" fontWeight="bold">
                  {item.title}
                </Typography>
                <Divider sx={{ my: 2, borderColor: "grey.300" }} />
                <Typography variant="body2" mt={2}>
                  {item.description}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserDashboard;
