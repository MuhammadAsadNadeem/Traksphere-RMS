import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ContactContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(12, 0),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url('/assets/pattern.svg') repeat`,
    opacity: 0.05,
    zIndex: 1,
  },
}));

const ContactCard = styled(motion.div)(({ theme }) => ({
  background: `rgba(${theme.palette.primary.main}, 0.05)`,
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: theme.spacing(4),
  border: `1px solid rgba(${theme.palette.primary.main}, 0.1)`,
  height: "100%",
  transition: "all 0.3s ease",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: theme.palette.text.primary,
    "& fieldset": {
      borderColor: `rgba(${theme.palette.primary.main}, 0.2)`,
    },
    "&:hover fieldset": {
      borderColor: `rgba(${theme.palette.primary.main}, 0.4)`,
    },
    "&.Mui-focused fieldset": {
      borderColor: `rgba(${theme.palette.primary.main}, 0.8)`,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
  },
}));

const ContactButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
  color: theme.palette.text.primary,
  padding: theme.spacing(1.5, 4),
  borderRadius: "30px",
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 8px 20px ${theme.palette.primary.dark}`,
  },
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  background: `rgba(${theme.palette.primary.main}, 0.05)`,
  borderRadius: "10px",
  transition: "all 0.3s ease",
  "&:hover": {
    background: `rgba(${theme.palette.primary.main}, 0.08)`,
    transform: "translateX(5px)",
  },
}));

const ContactSection = () => {
  const theme = useTheme();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <ContactContainer id="contact">
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  color: theme.palette.primary.main,
                  mb: 3,
                }}
              >
                Get in Touch
              </Typography>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: "800px",
                  mx: "auto",
                  lineHeight: 1.8,
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                }}
              >
                Have questions about TrakSphere? We're here to help you optimize
                your fleet management experience.
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants}>
                <ContactCard>
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.text.primary,
                      mb: 4,
                      fontWeight: 600,
                    }}
                  >
                    Send us a Message
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        fullWidth
                        label="Message"
                        variant="outlined"
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ContactButton fullWidth>Send Message</ContactButton>
                    </Grid>
                  </Grid>
                </ContactCard>
              </motion.div>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} md={5}>
              <motion.div variants={itemVariants}>
                <ContactCard>
                  <Typography
                    variant="h5"
                    sx={{
                      color: theme.palette.text.primary,
                      mb: 4,
                      fontWeight: 600,
                    }}
                  >
                    Contact Information
                  </Typography>
                  <Box>
                    <InfoItem>
                      <EmailIcon
                        sx={{ color: theme.palette.primary.main, fontSize: 30 }}
                      />
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ color: theme.palette.text.secondary, mb: 0.5 }}
                        >
                          Email Us
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: theme.palette.text.primary }}
                        >
                          traksphere@gmail.com
                        </Typography>
                      </Box>
                    </InfoItem>
                    <InfoItem>
                      <PhoneIcon
                        sx={{ color: theme.palette.primary.main, fontSize: 30 }}
                      />
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ color: theme.palette.text.secondary, mb: 0.5 }}
                        >
                          Call Us
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: theme.palette.text.primary }}
                        >
                          +92 320 9450014
                        </Typography>
                      </Box>
                    </InfoItem>
                    <InfoItem>
                      <LocationOnIcon
                        sx={{ color: theme.palette.primary.main, fontSize: 30 }}
                      />
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ color: theme.palette.text.secondary, mb: 0.5 }}
                        >
                          Visit Us
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: theme.palette.text.primary }}
                        >
                          University of Engineering and Technology, Lahore{" "}
                          <br /> (New Campus)
                          <br />
                          Electrical Engineering Department
                        </Typography>
                      </Box>
                    </InfoItem>
                  </Box>
                </ContactCard>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </ContactContainer>
  );
};

export default ContactSection;
