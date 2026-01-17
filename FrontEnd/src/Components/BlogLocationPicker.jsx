import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function ClickHandler({ setLocation }) {
  useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });
  return null;
}

export default function BlogLocationPicker({ location, setLocation }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <p className="text-sm text-gray-600 mb-2">
        📍 Click on the map to select location
      </p>

      <MapContainer
        center={location}
        zoom={13}
        className="h-[300px] w-full rounded-xl"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler setLocation={setLocation} />
        <Marker position={location} />
      </MapContainer>

      <p className="text-xs mt-2 text-gray-500">
        Selected: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
      </p>
    </div>
  );
}
