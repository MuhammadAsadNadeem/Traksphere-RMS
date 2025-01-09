import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Collapse,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

// Dummy Data
interface Stop {
  value: string;
  label: string;
}

interface Route {
  id: string;
  route_no: string;
  driver: {
    label: string;
    phone: string;
  };
  vehicle_no: string;
  stops: Stop[];
}

const dummyRoutes: Route[] = [
  {
    id: "1",
    route_no: "01",
    driver: { label: "John Doe", phone: "123-456-7890" },
    vehicle_no: "B123",
    stops: [
      { value: "A", label: "Stop A" },
      { value: "B", label: "Stop B" },
      { value: "C", label: "Stop C" },
    ],
  },
  {
    id: "2",
    route_no: "02",
    driver: { label: "Jane Smith", phone: "987-654-3210" },
    vehicle_no: "B456",
    stops: [
      { value: "D", label: "Stop D" },
      { value: "E", label: "Stop E" },
      { value: "F", label: "Stop F" },
    ],
  },
];

const RouteDetails: React.FC = () => {
  const [expandedRoute, setExpandedRoute] = useState<string | null>(null);

  const toggleRoute = (routeId: string) => {
    setExpandedRoute((prev) => (prev === routeId ? null : routeId));
  };

  return (
    <Box sx={{ p: 3, bgcolor: "grey.100", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Available Routes
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        {dummyRoutes.map((route) => (
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
                  Route No:{" "}
                  <Typography component="span" fontWeight="light">
                    {route.route_no}
                  </Typography>
                </Typography>
                <Typography>
                  Driver Name:{" "}
                  <Typography component="span" fontWeight="light">
                    {route.driver.label}
                  </Typography>
                </Typography>
                <Typography>
                  Driver Ph_no:{" "}
                  <Typography component="span" fontWeight="light">
                    {route.driver.phone}
                  </Typography>
                </Typography>
                <Typography>
                  Bus #:{" "}
                  <Typography component="span" fontWeight="light">
                    {route.vehicle_no}
                  </Typography>
                </Typography>
              </Box>
              <IconButton sx={{ color: "white" }}>
                {expandedRoute === route.id ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>

            {/* Expanded Details */}
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
                  All Stops
                </Typography>
                <List>
                  {route.stops.map((stop) => (
                    <ListItem key={stop.value} sx={{ pl: 2 }}>
                      <ListItemText primary={stop.label} />
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
