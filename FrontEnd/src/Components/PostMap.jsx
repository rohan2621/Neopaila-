import { MapContainer, TileLayer, Marker } from "react-leaflet";

const PostMap = ({ location }) => {
  if (!location?.lat || !location?.lng) return null;

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={12}
      style={{ height: "300px", width: "100%" }}
      className="rounded-xl shadow-md"
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.lat, location.lng]} />
    </MapContainer>
  );
};

export default PostMap;
