import { createTheme, ThemeOptions } from "@mui/material/styles";
import { deepPurple, red, green, teal } from "@mui/material/colors";

const primaryShades = {
  50: teal[50],
  100: teal[100],
  200: teal[200],
  300: teal[300],
  400: teal[400],
  500: teal[500],
  600: teal[600],
  700: teal[700],
  800: teal[800],
  900: teal[900],
};

export const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: primaryShades[700],
      light: primaryShades[400],
      dark: primaryShades[900],
      contrastText: "#ffffff",
    },
    secondary: {
      main: primaryShades[400],
      light: primaryShades[200],
      dark: primaryShades[700],
    },
    error: { main: red[500] },
    success: { main: green[500] },
  },
});
