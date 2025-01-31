import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchCounts,
  fetchBusStops,
} from "../../../store/thunks/adminThunk.ts";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { People, DirectionsBus, Place, Route } from "@mui/icons-material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet.gridlayer.googlemutant";

const DEFAULT_CENTER: L.LatLngTuple = [31.5497, 74.3436];
const DEFAULT_ZOOM = 10;

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const cardStyles = [
  { background: "linear-gradient(45deg,  #673ab7, #cd83d0 )" },
  { background: "linear-gradient(45deg, #1a627e , #645bb0 )" },
  { background: "linear-gradient(45deg, #3f51b5 , #1a237e )" },
  { background: "linear-gradient(45deg, #03a9f4 , #11a094 )" },
];

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { counts, busStops, loading, error } = useAppSelector(
    (state) => state.adminSlice
  );

  useEffect(() => {
    dispatch(fetchCounts())
      .unwrap()
      .catch((error) => {
        console.error("Failed to fetch counts:", error);
      });

    dispatch(fetchBusStops())
      .unwrap()
      .catch((error) => {
        console.error("Failed to fetch bus stops:", error);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size="3rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 3,
        }}
      >
        <Card sx={{ boxShadow: 3, ...cardStyles[0], color: "white" }}>
          <CardContent>
            <People sx={{ fontSize: 40 }} />
            <Typography variant="h5">Total Users</Typography>
            <Typography variant="h3">{counts?.totalUsers}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 3, ...cardStyles[1], color: "white" }}>
          <CardContent>
            <DirectionsBus sx={{ fontSize: 40 }} />
            <Typography variant="h5">Total Drivers</Typography>
            <Typography variant="h3">{counts?.totalDrivers}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 3, ...cardStyles[2], color: "white" }}>
          <CardContent>
            <Place sx={{ fontSize: 40 }} />
            <Typography variant="h5">Bus Stops</Typography>
            <Typography variant="h3">{counts?.totalBusStops}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 3, ...cardStyles[3], color: "white" }}>
          <CardContent>
            <Route sx={{ fontSize: 40 }} />
            <Typography variant="h5">Total Routes</Typography>
            <Typography variant="h3">{counts?.totalRoutes}</Typography>
          </CardContent>
        </Card>
      </Box>

      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Bus Stops Map
          </Typography>
          <Box sx={{ height: "400px", width: "100%", position: "relative" }}>
            {loading ? (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <MapContainer
                center={DEFAULT_CENTER}
                zoom={DEFAULT_ZOOM}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  maxZoom={20}
                  subdomains={["mt0", "mt1", "mt2", "mt3"]}
                />
                {Array.isArray(busStops) && busStops.length > 0 ? (
                  busStops.map((stop) => (
                    <Marker
                      key={stop.id}
                      position={[stop.latitude, stop.longitude]}
                      icon={defaultIcon}
                    >
                      <Popup>{stop.stopName}</Popup>
                    </Marker>
                  ))
                ) : (
                  <Typography variant="body1" align="center">
                    No bus stops available.
                  </Typography>
                )}
              </MapContainer>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDashboard;
