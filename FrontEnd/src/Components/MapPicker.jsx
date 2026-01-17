import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const LocationMarker = ({ setLocation, coverImage }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation(e.latlng);
    },
  });

  return position ? (
    <Marker position={position}>
      {coverImage && (
        <Popup>
          <img
            src={coverImage}
            alt="Cover"
            className="w-32 h-20 object-cover rounded"
          />
        </Popup>
      )}
    </Marker>
  ) : null;
};

const MapPicker = ({ setLocation, coverImage }) => (
  <MapContainer
    center={[27.7172, 85.324]} // Default: Kathmandu
    zoom={13}
    scrollWheelZoom={true}
    style={{ height: "300px", width: "100%" }}
  >
    <TileLayer
      attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LocationMarker setLocation={setLocation} coverImage={coverImage} />
  </MapContainer>
);

export default MapPicker;
