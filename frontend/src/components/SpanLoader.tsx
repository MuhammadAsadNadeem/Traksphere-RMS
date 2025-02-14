import React from "react";
import { Box, keyframes } from "@mui/material";

const scaleAnimation = keyframes`
  0%, 40%, 100% {
    transform: scaleY(0.05);
  }
  20% {
    transform: scaleY(1);
  }
`;

const SpanLoader: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100px",
          height: "100px",
          gap: "6px",
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <Box
            key={i}
            sx={{
              width: "4px",
              height: "50px",
              backgroundColor: getColor(i),
              animation: `${scaleAnimation} 0.9s ease-in-out infinite`,
              animationDelay: `${-0.9 + i * 0.1}s`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const getColor = (index: number) => {
  const colors = [" #4c86f9", " #49a84c", " #f6bb02", " #a902f6", " #2196f3"];
  return colors[index];
};

export default SpanLoader;
