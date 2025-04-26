import { Box, Typography } from "@mui/material";
import theme from "../theme";

// Define the props interface
interface CustomNoRowsOverlayProps {
  message: string;
}

// Correctly destructure the props in the component function
const CustomNoRowsOverlay = ({
  message,
}: CustomNoRowsOverlayProps): JSX.Element => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      p: 2,
    }}
  >
    <Typography variant="body1" color={theme.palette.primary.main}>
      {message}
    </Typography>
  </Box>
);

export default CustomNoRowsOverlay;
