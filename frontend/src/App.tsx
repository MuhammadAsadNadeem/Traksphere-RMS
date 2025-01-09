import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { PublicRoutes } from "./routes";
import Public from "./layouts/public";
import { theme } from "./config/theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
    children: PublicRoutes,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
