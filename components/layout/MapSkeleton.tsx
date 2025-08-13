import React from "react";
import { Skeleton } from "../ui/skeleton";

const MapSkeleton = () => {
  return (
    <>
      <Skeleton className="h-full w-full sm:w-[600px] sm:h-[590px] rounded-lg" />
    </>
  );
};

export default MapSkeleton;
