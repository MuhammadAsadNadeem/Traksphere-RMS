import { Box, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <Box mb="30px">
      <Typography variant="h3" fontWeight="bold" color={indigo[700]} mb="5px">
        {title}
      </Typography>
      <Typography variant="h6" color={indigo[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
