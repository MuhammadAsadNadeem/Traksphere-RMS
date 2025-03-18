import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { routes } from "../../../routes";

const HeroSection: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "calc(100vh - 64px)", md: "calc(100vh - 80px)" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        pt: { xs: 8, sm: 12, md: 16 },
        pb: { xs: 12, sm: 16, md: 20 },
      }}
    >
      {/* Background Gradient */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
          zIndex: -1,
        }}
      />

      {/* Content Container */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: { xs: 6, md: 8 },
          }}
        >
          {/* Left Content */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              flex: "1 1 auto",
              maxWidth: { xs: "100%", md: "60%" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="h1"
              component={motion.h1}
              sx={{
                fontSize: {
                  xs: "2.5rem",
                  sm: "3.5rem",
                  md: "4rem",
                  lg: "4.5rem",
                },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: { xs: 2, md: 3 },
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Traksphere Smart Transit Solutions for Modern Campus
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                color: theme.palette.text.secondary,
                fontWeight: 400,
                lineHeight: 1.5,
                mb: { xs: 4, md: 5 },
                maxWidth: "600px",
                mx: { xs: "auto", md: 0 },
              }}
            >
              Experience seamless campus transportation with real-time tracking
              and smart notifications
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 2, sm: 3 },
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Button
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                variant="contained"
                size={isMobile ? "large" : "large"}
                onClick={() => navigate(routes.signup)}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  py: { xs: 1.5, md: 2 },
                  px: { xs: 4, md: 6 },
                  borderRadius: 2,
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  fontWeight: 600,
                  textTransform: "none",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                }}
              >
                Get Started Free
              </Button>
            </Box>

            {/* Stats */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(3, 1fr)",
                },
                gap: { xs: 3, sm: 4 },
                mt: { xs: 6, md: 8 },
              }}
            >
              {[
                { value: "50+", label: "Active Routes" },
                { value: "1000+", label: "Daily Riders" },
                { value: "99.9%", label: "On-time Rate" },
              ].map((stat, index) => (
                <Box
                  key={index}
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  sx={{
                    textAlign: "center",
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      fontWeight: 700,
                      mb: 1,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: { xs: "1rem", md: "1.125rem" },
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right Content - Image */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            sx={{
              flex: "0 0 auto",
              width: { xs: "100%", md: "40%" },
              display: { xs: "none", md: "block" },
            }}
          >
            <Box
              component="img"
              src="src/assets/images/hero-illustration.svg"
              alt="Smart Transit"
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: "500px",
                mx: "auto",
                filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.1))",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
