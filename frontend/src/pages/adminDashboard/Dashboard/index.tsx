import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks.ts";
import { fetchCounts, fetchBusStops } from "../../../store/user/adminThunk.ts";
import { Box, Typography, CardContent, Card } from "@mui/material";
import { People, DirectionsBus, Place, Route } from "@mui/icons-material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "leaflet.gridlayer.googlemutant";
import CardComponent from "../../../components/Cards.tsx";
import SpanLoader from "../../../components/SpanLoader.tsx";
import MapIcon from "../../../components/MapIcon.tsx";

const DEFAULT_CENTER: L.LatLngTuple = [31.5497, 74.3436];
const DEFAULT_ZOOM = 10;

const AdminDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { counts, busStops, loading } = useAppSelector(
    (state) => state.adminSlice
  );

  useEffect(() => {
    dispatch(fetchCounts()).unwrap();
    dispatch(fetchBusStops()).unwrap();
  }, [dispatch]);

  const cardData = [
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: "Total Users",
      value: counts?.totalUsers || 0,
    },
    {
      icon: <DirectionsBus sx={{ fontSize: 40 }} />,
      title: "Total Drivers",
      value: counts?.totalDrivers || 0,
    },
    {
      icon: <Place sx={{ fontSize: 40 }} />,
      title: "Bus Stops",
      value: counts?.totalBusStops || 0,
    },
    {
      icon: <Route sx={{ fontSize: 40 }} />,
      title: "Total Routes",
      value: counts?.totalRoutes || 0,
    },
  ];

  if (loading) {
    return <SpanLoader />;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
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
        {cardData.map((card, index) => (
          <CardComponent
            key={index}
            icon={card.icon}
            title={card.title}
            value={card.value}
          />
        ))}
      </Box>

      <Card sx={{ boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom color=" #3f51b5">
            Bus Stops
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
              ></Box>
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
                      icon={MapIcon}
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
