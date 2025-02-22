import { useEffect, useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAllRoutes } from "../../store/user/userThunk";
import SpanLoader from "../../components/SpanLoader";
import { RouteType } from "../../types/user.types";
import { indigo } from "@mui/material/colors";

const RouteDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { routes, isLoading } = useAppSelector((state) => state.userSlice);
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchAllRoutes());
  }, [dispatch]);

  const toggleRoute = (routeId: string) => {
    setExpandedRoute((prev) => (prev === routeId ? null : routeId));
  };

  if (isLoading) {
    return <SpanLoader />;
  }

  return (
    <Box sx={{ p: 3, bgcolor: "grey.100", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mt: 3, color: indigo[700] }}
        gutterBottom
      >
        Available Routes
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {routes.map((route: RouteType) => (
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
                    {route.driver?.fullName}
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
                  {(route.busStops ?? []).map((stop) => (
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
