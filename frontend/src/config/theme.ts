import { createTheme, ThemeOptions } from '@mui/material/styles';

export const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#303f9f",


    },
    secondary: {
      main: "#808080",
    },
    error: {
      main: "#ff0000",
    },
    success: {
      main: "#008000",
    },
    background: {
      default: '#e0dede',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
