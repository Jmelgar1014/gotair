import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L, { LatLng } from "leaflet";

const CurrentLocation = () => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);

      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const greenIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // L.marker([40.7523, -73.9833], { icon: greenIcon }).addTo(map);
  return position ? (
    <Marker position={position} icon={greenIcon}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;
};

export default CurrentLocation;
