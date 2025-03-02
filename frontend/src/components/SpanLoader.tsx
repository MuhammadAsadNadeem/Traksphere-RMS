import React from "react";
import { Box, keyframes } from "@mui/material";

const scaleAnimation = keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.2);
    opacity: 0.6;
  }
  20% {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const colors = ["#4c86f9", "#49a84c", "#f6bb02", "#a902f6", "#2196f3"];

const SpanLoader: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "120px",
          gap: "8px",
        }}
      >
        {colors.map((color, i) => (
          <Box
            key={i}
            sx={{
              width: "6px",
              height: "50px",
              backgroundColor: color,
              borderRadius: "3px",
              animation: `${scaleAnimation} 1s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SpanLoader;
