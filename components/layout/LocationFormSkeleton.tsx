import React from "react";
import { Skeleton } from "../ui/skeleton";

const LocationFormSkeleton = () => {
  return (
    <>
      <section className="p-4 m-4">
        <Skeleton className="h-8  rounded-lg m-8" />
        <Skeleton className="h-8  rounded-lg m-8" />
        <Skeleton className="h-8  rounded-lg m-8" />
        <Skeleton className="h-8  rounded-lg m-8" />
        <Skeleton className="h-8  rounded-lg m-8" />
        <Skeleton className="h-8 w-40 rounded-lg m-8" />
      </section>
    </>
  );
};

export default LocationFormSkeleton;
