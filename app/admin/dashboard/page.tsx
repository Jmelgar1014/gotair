"use client";
import AddStationNavBar from "@/components/layout/AddStationNavBar";
import UserSubmitTable from "@/components/layout/UserSubmitTable";
import React, { useEffect, useState } from "react";

import { usePermissionContext } from "@/context/PermissionProvider";
import { responseType } from "@/app/api/submit/route";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { authToken, role } = usePermissionContext();
  const [submission, setSubmissions] = useState<responseType[]>([]);
  const [cursor, setCursor] = useState<string>("");

  const handleQuery = async (token: string) => {
    console.log("dkjsdfkldfsjdkfs");
    const response = await fetch(`/api/submit?cursor=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    console.log(data);
    setSubmissions(data.page);
    setCursor(data.continueCursor);

    return data;
  };

  useEffect(() => {
    if (!authToken) return;
    const getRowData = async () => {
      const response = await fetch("/api/submit", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setCursor(data.continueCursor);
      setSubmissions(data.page);
    };
    try {
      getRowData();
    } catch (error) {
      console.error(error);
    }
  }, [authToken]);

  return (
    <>
      <main>
        <AddStationNavBar />
        {role === "Admin" && (
          <section>
            <div className="flex justify-center mt-8">
              <div className="m-4 border rounded-md p-2 w-full sm:max-w-4xl">
                <UserSubmitTable data={submission} />
                <Button onClick={() => handleQuery(cursor)}>Next Page</Button>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Page;
