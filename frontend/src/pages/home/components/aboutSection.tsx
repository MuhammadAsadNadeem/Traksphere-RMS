import { Box, Typography } from "@mui/material";

const AboutSection: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <Box sx={{ width: { xs: "100%", sm: "48%" } }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography>{description}</Typography>
  </Box>
);

export default AboutSection;
