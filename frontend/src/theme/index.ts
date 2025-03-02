import { createTheme } from "@mui/material/styles";
import { red, green, teal, indigo } from "@mui/material/colors";

const primaryShades = Object.fromEntries(
  Object.entries(indigo).filter(([key]) => !isNaN(Number(key)))
);

declare module "@mui/material/styles" {
  interface Theme {
    button: {
      backgroundColor: string;
      color: string;
      hoverBackgroundColor: string;
    };
    table: {
      backgroundColor: string;
      color: string;
    };
  }
  interface ThemeOptions {
    button?: {
      backgroundColor: string;
      color: string;
      hoverBackgroundColor: string;
    };
    table?: {
      backgroundColor: string;
      color: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryShades["700"],
      light: primaryShades["400"],
      dark: primaryShades["900"],
      contrastText: "#ffffff",
    },
    secondary: {
      main: primaryShades["400"],
      light: primaryShades["200"],
      dark: primaryShades["700"],
    },
    error: { main: red[500] },
    success: { main: green[500] },
  },
  button: {
    backgroundColor: primaryShades["700"],
    color: "#fff",
    hoverBackgroundColor: primaryShades["900"],
  },
  table: {
    backgroundColor: primaryShades["50"],
    color: primaryShades["900"],
  },
});
