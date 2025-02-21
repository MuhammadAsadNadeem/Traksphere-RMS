import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { BusStopType } from "../../../types/stop.types";
import { useEffect } from "react";

const MapController = ({
  stops,
  onClick,
  center,
}: {
  stops: BusStopType[];
  onClick?: (latlng: L.LatLng) => void;
  center?: [number, number];
}) => {
  const map = useMap();

  useMapEvents({
    click: (e) => onClick?.(e.latlng),
  });

  useEffect(() => {
    if (stops.length > 0) {
      const bounds = stops.reduce(
        (acc, stop) => acc.extend([stop.latitude, stop.longitude]),
        L.latLngBounds([])
      );
      map.fitBounds(bounds);
    } else if (center) {
      map.setView(center, 12);
    }
  }, [stops, map, center]);

  return null;
};

const MapView = ({
  stops,
  onClick,
  interactive = true,
  center = [30.3753, 69.3451],
}: {
  stops: BusStopType[];
  onClick?: (latlng: L.LatLng) => void;
  interactive?: boolean;
  center?: [number, number];
}) => {
  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
      dragging={interactive}
      doubleClickZoom={interactive}
      scrollWheelZoom={interactive}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapController stops={stops} onClick={onClick} center={center} />
      {stops.map((stop) => (
        <Marker key={stop.id} position={[stop.latitude, stop.longitude]} />
      ))}
    </MapContainer>
  );
};

export default {
  MapView,
};
