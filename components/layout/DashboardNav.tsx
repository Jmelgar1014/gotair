import React from "react";
import { Button } from "../ui/button";

const DashboardNav = () => {
  return (
    <>
      <nav className="mt-8">
        <ul className="flex">
          <li className="p-2">
            <Button className="cursor-pointer bg-blue-600 hover:bg-blue-800 font-semibold">
              Approve
            </Button>
          </li>
          <li className="p-2">
            <Button className="cursor-pointer bg-blue-600 hover:bg-blue-800 font-semibold">
              Manage
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default React.memo(DashboardNav);
