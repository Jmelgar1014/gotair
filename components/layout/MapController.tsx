"use client";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  coordinates: [number, number] | null;
};

const MapController = ({ coordinates }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 13); // zoom level 13
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);

  return null; // this component only controls the map
};

export default MapController;
