import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Demo from "../../assets/images/demo.png";
import LiveTracking from "../../assets/images/livetracker.png";
import GeoFencing from "../../assets/images/geofencing.png";
import { routes } from "../../routes";
import FeatureCard from "./components/featureCard";
import AboutSection from "./components/aboutSection";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        id="home"
        sx={{
          py: { xs: 6, sm: 10 },
          backgroundColor: blue[50],
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              flex: 1,
              textAlign: "left",
              pr: { xs: 0, sm: 4 },
            }}
          >
            <Typography variant="h3" gutterBottom>
              Real-Time GPS Tracking
            </Typography>
            <Typography variant="h6" mb={2}>
              Track your vehicle's location with precision and ease.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate(routes.signup)}
            >
              Get Started
            </Button>
          </Box>

          <Box sx={{ flex: 1 }}>
            <img
              src={Demo}
              alt="Real-Time GPS Tracking"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Container>
      </Box>

      <Box id="features" py={4}>
        <Container>
          <Typography variant="h4" gutterBottom align="center">
            Our Features
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <FeatureCard
              image={LiveTracking}
              title="Live Tracking"
              description="Track your vehicle's real-time location accurately and securely."
            />

            <FeatureCard
              image={GeoFencing}
              title="Geo-Fencing"
              description="Set up boundaries for your vehicle and receive alerts when it enters/exits."
            />
          </Box>
        </Container>
      </Box>

      <Box id="about" sx={{ padding: "50px 0", backgroundColor: blue[100] }}>
        <Container>
          <Typography variant="h4" gutterBottom align="center">
            About Us
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 4,
            }}
          >
            <AboutSection
              title="Who We Are"
              description="We are a technology company dedicated to providing cutting-edge GPS tracking solutions. Our mission is to ensure safety, efficiency, and convenience for our customers by delivering innovative vehicle tracking solutions."
            />
            <AboutSection
              title="Our Vision"
              description="We aim to revolutionize the transportation and logistics industry with reliable and precise tracking systems, helping businesses and individuals stay connected to their vehicles at all times."
            />
          </Box>
        </Container>
      </Box>

      <Box id="contact" sx={{ padding: "50px 0" }}>
        <Container>
          <Typography variant="h4" gutterBottom align="center">
            Contact Us
          </Typography>
          <Typography variant="body1" align="center">
            Have questions or need assistance? Reach out to us anytime. Our
            support team is here to help you with your GPS tracking needs. You
            can email us at{" "}
            <a href="mailto:traksphere@gmail.com">traksphere@gmail.com</a> or
            call us at +92 1234567890.
          </Typography>
        </Container>
      </Box>

      <Typography variant="body2" align="center" sx={{ padding: "20px 0" }}>
        &copy; 2024 Traksphere. All rights reserved.
      </Typography>
    </Box>
  );
};

export default LandingPage;
