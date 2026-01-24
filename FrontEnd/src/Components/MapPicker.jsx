import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

// Marker icon fix (you already import this globally too, safe to keep once)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const LocationMarker = ({ location, setLocation, coverImage }) => {
  useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  if (!location) return null;

  return (
    <Marker position={[location.lat, location.lng]}>
      {coverImage && (
        <Popup>
          <img
            src={coverImage}
            alt="Cover"
            className="h-20 w-32 rounded object-cover"
          />
        </Popup>
      )}
    </Marker>
  );
};

const MapPicker = ({ setLocation, coverImage, initialLocation }) => {
  const [location, setInternalLocation] = useState(initialLocation || null);

  useEffect(() => {
    if (location) setLocation(location);
  }, [location, setLocation]);

  return (
    <div className="h-[300px] w-full overflow-hidden rounded-xl border shadow-md">
      <MapContainer
        center={
          location ? [location.lat, location.lng] : [27.7172, 85.324] // Kathmandu default
        }
        zoom={location ? 14 : 7}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker
          location={location}
          setLocation={setInternalLocation}
          coverImage={coverImage}
        />
      </MapContainer>
    </div>
  );
};

export default MapPicker;
