import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BusStopType } from "../../../types/stop.types";

interface MapComponentProps {
  stops: BusStopType[];
  center: [number, number];
}

const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ stops, center }) => {
  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stops.map((stop) => (
        <Marker key={stop.id} position={[stop.latitude, stop.longitude]} />
      ))}
      <MapController center={center} />
    </MapContainer>
  );
};

export default MapComponent;
