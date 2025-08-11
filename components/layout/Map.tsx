"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import CurrentLocation from "./CurrentLocation";
import MapController from "./MapController";
// import iconUrl from "leaflet/dist/images/marker-icon.png";
// import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
// import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet’s default icon URLs in Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

export type locationList = {
  id: number;
  name: string;
  address: string;
  coordinates: [number, number];
};

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[] | undefined;
  location: [number, number] | null;
};

export default function MyMap({ list, location }: Props) {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController coordinates={location} />
      {list?.map((location) => {
        // console.log(Array.isArray(location.coordinates));
        // console.log([location.lat, location.lng]);
        return (
          <Marker key={location._id} position={[location.lat, location.lng]}>
            <Popup>
              {location.name} <br /> {location.address}
              {/* <p
                className="text-blue-800 font-semibold cursor-pointer hover:underline"
                onClick={() => console.log("testing")}
              >
                More Information
              </p> */}
            </Popup>
          </Marker>
        );
      })}
      <CurrentLocation />
    </MapContainer>
  );
}
