import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

const Public = () => {
  return (
    <Box minHeight="100vh" sx={{ bgcolor: grey[200] }}>
      <Navbar />
      <Box
        minHeight="88vh"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Public;
