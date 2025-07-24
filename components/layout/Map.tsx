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

// const locationList: locationList[] = [
//   {
//     id: 1,
//     name: "Exxon Mobile",
//     coordinates: [40.61422, 286.25],
//   },
//   {
//     id: 2,
//     name: "Exxon Mobile",
//     coordinates: [40.61511, 286.24699],
//   },
// ];

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[] | undefined;
  location: [number, number];
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
            </Popup>
          </Marker>
        );
      })}
      <CurrentLocation />
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={[40.61422, 286.24699]}>
        <Popup>Titties</Popup>
      </Marker> */}
    </MapContainer>
  );
}
