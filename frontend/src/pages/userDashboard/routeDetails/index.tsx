import { useEffect, useState } from "react";
import { fetchAllRoutes } from "../../../store/user/userThunk";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  Box,
  Typography,
  Card,
  IconButton,
  Collapse,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import SpanLoader from "../../../components/SpanLoader";

interface Route {
  id: string;
  routeName: string;
  routeNumber: string;
  driver?: { fullName: string };
  vehicleNumber: string;
  busStopIds?: { id: string; stopName: string }[];
}

const RouteDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const routes = useAppSelector((state) => state.userSlice.routes);
  const isLoading = useAppSelector((state) => state.userSlice.isLoading);
  const error = useAppSelector((state) => state.userSlice.error); // Add error state
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllRoutes());
  }, [dispatch]);

  const toggleRoute = (routeId: string) => {
    setExpandedRoute((prev) => (prev === routeId ? null : routeId));
  };

  // Handle loading state
  if (isLoading) {
    return <SpanLoader />;
  }

  // Handle error state
  if (error) {
    return (
      <Box sx={{ p: 3, bgcolor: "grey.100", minHeight: "100vh" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Available Routes
        </Typography>
        <Typography variant="body1" color="error">
          Error loading routes: {error}
        </Typography>
      </Box>
    );
  }

  // Handle empty state
  if (!routes || routes.length === 0) {
    return (
      <Box sx={{ p: 3, bgcolor: "grey.100", minHeight: "100vh" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Available Routes
        </Typography>
        <Typography variant="body1">No routes available.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: "grey.100", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Available Routes
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {routes.map((route: Route) => (
          <Card
            key={route.id}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              borderRadius: 2,
              transition: "0.3s",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            {/* Route Header */}
            <Box
              onClick={() => toggleRoute(route.id)}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              sx={{ cursor: "pointer" }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Route Name:{" "}
                  <Typography component="span" fontWeight="light">
                    {route.routeName}
                  </Typography>
                </Typography>
                <Typography>
                  Route Number:{" "}
                  <Typography component="span" fontWeight="light">
                    {route.routeNumber}
                  </Typography>
                </Typography>
                <Typography>
                  Driver Name:{" "}
                  <Typography component="span" fontWeight="light">
                    {route.driver?.fullName || "N/A"}
                  </Typography>
                </Typography>
                <Typography>
                  Bus No:{" "}
                  <Typography component="span" fontWeight="light">
                    {route.vehicleNumber}
                  </Typography>
                </Typography>
              </Box>
              <IconButton sx={{ color: "white" }}>
                {expandedRoute === route.id ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>

            {/* Expanded Bus Stops List */}
            <Collapse
              in={expandedRoute === route.id}
              timeout="auto"
              unmountOnExit
            >
              <CardContent sx={{ bgcolor: "white", color: "black" }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  sx={{ borderBottom: "1px solid #ddd", pb: 1, mb: 2 }}
                >
                  Bus Stops
                </Typography>
                <List>
                  {route.busStopIds?.map((stop) => (
                    <ListItem key={stop.id}>
                      <ListItemText primary={stop.stopName} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default RouteDetails;
