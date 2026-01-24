import { useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";

const fetchMapBySlug = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/maps/${slug}`);
  return res.data;
};

const LocationPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    data: map,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["map", slug],
    queryFn: () => fetchMapBySlug(slug),
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500">
        Loading map...
      </div>
    );
  }

  if (isError || !map?.location) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Location not found
        </h2>
      </div>
    );
  }

  const {
    title,
    img,
    location: { lat, lng },
  } = map;

  return (
    <div className="relative h-screen w-full">
      {/* BACK BUTTON */}

      {/* MAP */}
      <MapContainer center={[lat, lng]} zoom={14} className="h-full w-full">
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[lat, lng]}>
          <Popup>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">{title}</h3>
              {img && (
                <img
                  src={img}
                  alt={title}
                  className="h-24 w-40 rounded object-cover"
                />
              )}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationPage;
