import React from "react";
import { Box, keyframes, Typography } from "@mui/material";

// Keyframe animation for rotating effect
const rotate = keyframes`
  0% { transform: rotate(0deg); opacity: 0.6; }
  50% { transform: rotate(180deg); opacity: 1; }
  100% { transform: rotate(360deg); opacity: 0.6; }
`;

interface SpanLoaderProps {
  size?: number; // Customizable size
  speed?: number; // Customizable animation speed
  message?: string; // Customizable loading message
}

const SpanLoader: React.FC<SpanLoaderProps> = ({
  size = 100,
  speed = 2,
  message = "Loading...",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box
        component="img"
        src="/src/assets/images/logo.svg"
        alt="TrakSphere Logo"
        onError={(e) => {
          // Fallback in case the image fails to load
          (e.target as HTMLImageElement).src = "/path/to/fallback-image.svg";
        }}
        sx={{
          width: size,
          height: size,
          animation: `${rotate} ${speed}s ease-in-out infinite`,
        }}
      />
      <Typography
        variant="body1"
        sx={{
          marginTop: 2,
          color: "#333",
          fontSize: "1.2rem",
          fontWeight: "500",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default SpanLoader;
