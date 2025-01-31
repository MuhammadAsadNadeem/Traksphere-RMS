import { Box, Typography } from "@mui/material";

const FeatureCard: React.FC<{
  image: string;
  title: string;
  description: string;
}> = ({ image, title, description }) => (
  <Box
    sx={{
      backgroundColor: "white",
      padding: 3,
      borderRadius: 2,
      boxShadow: 2,
      textAlign: "center",
      flex: { xs: "100%", sm: "1" },
    }}
  >
    <img
      src={image}
      alt={title}
      style={{
        width: "120px",
        height: "120px",
        marginBottom: "20px",
      }}
    />
    <Typography variant="h6">{title}</Typography>
    <Typography>{description}</Typography>
  </Box>
);

export default FeatureCard;
