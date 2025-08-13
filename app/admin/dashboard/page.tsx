"use client";
import AddStationNavBar from "@/components/layout/AddStationNavBar";
import UserSubmitTable from "@/components/layout/UserSubmitTable";
import React, { useEffect, useState, useCallback } from "react";
import { userSubmitType } from "@/app/api/submit/route";
import { Button } from "@/components/ui/button";
import { locationType } from "@/schema/submitLocationSchema";
import DashboardNav from "@/components/layout/DashboardNav";
import { useAuthorization } from "@/context/useAuthorization";
import LoadingSkeleton from "@/components/layout/LoadingSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "@/components/layout/TableSkeleton";

const ROW_COUNT = 10;

const Page = () => {
  const { isAuthorized, isLoading, authToken } = useAuthorization(
    ["Admin"],
    "/"
  );
  const [submission, setSubmissions] = useState<userSubmitType[]>([]);
  const [currentCursor, setCurrentCursor] = useState<string>("");
  const [nextCursor, setNextCursor] = useState<string>("");
  const [cursorHistory, setCursorHistory] = useState<string[]>([""]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataFetched, setDataFetched] = useState<boolean>(false);

  const fetchData = useCallback(
    async (cursor: string) => {
      if (!authToken || loading) return null;

      setLoading(true);
      try {
        const response = await fetch(`/api/submit?cursor=${cursor}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [authToken, loading]
  );

  const updatePageData = (data: locationType, cursor: string) => {
    setSubmissions(data.page || []);
    setCurrentCursor(cursor);
    setNextCursor(data.continueCursor || "");
  };

  const handleNext = async () => {
    if (!nextCursor || loading) return;

    const data = await fetchData(nextCursor);
    if (!data) return;

    // Add current cursor to history if it's not already there
    const newPageIndex = currentPageIndex + 1;
    setCursorHistory((prev) => {
      const newHistory = [...prev];
      // Ensure we have the cursor for the current page
      if (newHistory.length <= newPageIndex) {
        newHistory[newPageIndex] = nextCursor;
      }
      return newHistory;
    });

    setCurrentPageIndex(newPageIndex);
    updatePageData(data, nextCursor);
  };

  const handlePrev = async () => {
    if (currentPageIndex <= 0 || loading) return;

    const prevPageIndex = currentPageIndex - 1;
    const prevCursor = cursorHistory[prevPageIndex] || "";

    const data = await fetchData(prevCursor);
    if (!data) return;

    setCurrentPageIndex(prevPageIndex);
    updatePageData(data, prevCursor);
  };

  // Initial data load
  useEffect(() => {
    if (!authToken) return;

    const loadInitialData = async () => {
      const data = await fetchData("");
      if (data) {
        updatePageData(data, "");
        // Reset pagination state
        setCursorHistory([""]);
        setCurrentPageIndex(0);
        setDataFetched(true);
      }
    };
    setDataFetched(false);
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const hasPrevPage = currentPageIndex > 0;
  const hasNextPage = !!nextCursor;

  if (!dataFetched) {
    return (
      <>
        <AddStationNavBar />
        <div className="flex justify-center">
          <DashboardNav />
        </div>
        <section>
          <div className="flex justify-center mt-8">
            <div className="m-4 border rounded-md p-2 w-full sm:max-w-4xl">
              <TableSkeleton />
              {/* <UserSubmitTable data={submission} /> */}
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <>
      <main>
        <AddStationNavBar />
        <div className="flex justify-center">
          <DashboardNav />
        </div>

        <section>
          <div className="flex justify-center mt-8">
            <div className="m-4 border rounded-md p-2 w-full sm:max-w-4xl">
              <UserSubmitTable data={submission} />
              {submission.length > 0 && (
                <div className="flex justify-between items-center mt-4">
                  <Button
                    onClick={handlePrev}
                    disabled={!hasPrevPage || loading}
                    variant={hasPrevPage ? "default" : "secondary"}
                  >
                    {loading ? "Loading..." : "Previous Page"}
                  </Button>

                  <span className="text-sm text-gray-600">
                    Page {currentPageIndex + 1}
                  </span>

                  <Button
                    onClick={handleNext}
                    disabled={!hasNextPage || loading || submission.length < 10}
                    variant={hasNextPage ? "default" : "secondary"}
                  >
                    {loading ? "Loading..." : "Next Page"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
