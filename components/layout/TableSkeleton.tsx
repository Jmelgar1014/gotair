import React from "react";
import { Skeleton } from "../ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 10,
  columns = 6,
}) => {
  return (
    <>
      {/* Header skeleton */}
      <Skeleton className="h-16 w-full rounded-2xl p-4 my-8" />

      {/* Table rows */}
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex} className="flex justify-around">
          {Array.from({ length: columns }, (_, colIndex) => (
            <Skeleton key={colIndex} className="h-8 w-28 rounded-lg p-4 my-2" />
          ))}
        </div>
      ))}
    </>
  );
};

export default TableSkeleton;
