import { Typography, useTheme, IconButton, Box } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";

import {
  HeroContainer,
  HeroContent,
  CTAButton,
  StatsContainer,
  StatCard,
  FeatureGrid,
  FeatureCard,
  ScrollDownButton,
} from "./StyledComponents";
import { routes } from "../../../routes";

const stats = [
  {
    icon: <DirectionsBusIcon />,
    value: "100+",
    label: "Active Buses",
    description: "Serving your campus daily",
  },
  {
    icon: <PeopleIcon />,
    value: "10K+",
    label: "Daily Users",
    description: "Students trust our service",
  },
  {
    icon: <AccessTimeIcon />,
    value: "99.9%",
    label: "On-Time Rate",
    description: "Reliable transportation",
  },
];

const features = [
  {
    icon: <LocationOnIcon />,
    title: "Real-time Tracking",
    description: "Track your bus location live",
  },
  {
    icon: <NotificationsActiveIcon />,
    title: "Smart Alerts",
    description: "Never miss your bus again",
  },
  {
    icon: <SecurityIcon />,
    title: "Enhanced Safety",
    description: "Your security is our priority",
  },
  {
    icon: <SpeedIcon />,
    title: "Route Optimization",
    description: "Fastest routes guaranteed",
  },
];

const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <HeroContainer id="home">
      <HeroContent
        style={{ opacity, y }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        <Box component={motion.div} variants={titleVariants}>
          <Typography
            variant="h1"
            sx={{
              mt: 8,
              fontSize: { xs: "2.5rem", md: "4.5rem" },
              fontWeight: 800,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            TrakSphere
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.5rem", md: "2.5rem" },
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 2,
            }}
          >
            Smart Bus Route Management System
          </Typography>
        </Box>

        <motion.div variants={fadeInUp}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              fontWeight: 300,
              color: theme.palette.text.secondary,
              maxWidth: "800px",
              mx: "auto",
              mb: 4,
            }}
          >
            Experience the future of campus transportation with real-time
            tracking, optimized routes, and enhanced student safety—all in one
            powerful platform.
          </Typography>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <CTAButton
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            onClick={() => navigate(routes.signup)}
          >
            Get Started Now
          </CTAButton>
        </motion.div>

        <StatsContainer>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {stat.icon}
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  my: 1,
                }}
              >
                {stat.value}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {stat.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary, opacity: 0.8 }}
              >
                {stat.description}
              </Typography>
            </StatCard>
          ))}
        </StatsContainer>

        <FeatureGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Box>{feature.icon}</Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {feature.description}
                </Typography>
              </Box>
            </FeatureCard>
          ))}
        </FeatureGrid>

        <ScrollDownButton
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={scrollToFeatures}
        >
          <IconButton>
            <KeyboardArrowDownIcon
              sx={{ fontSize: 40, color: theme.palette.primary.main }}
            />
          </IconButton>
        </ScrollDownButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
