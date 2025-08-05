"use client";
import AddStationNavBar from "@/components/layout/AddStationNavBar";
import UserSubmitTable from "@/components/layout/UserSubmitTable";
import React, { useEffect, useState } from "react";

import { usePermissionContext } from "@/context/PermissionProvider";

const Page = () => {
  const { authToken, role } = usePermissionContext();
  const [submission, setSubmissions] = useState([]);
  // console.log(authToken);//

  useEffect(() => {
    if (!authToken) return;
    const getRowData = async () => {
      //console.log(authToken);
      const response = await fetch("/api/submit", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      setSubmissions(data);

      console.log(data);
    };
    try {
      getRowData();
    } catch (error) {
      console.log(error);
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
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Page;
