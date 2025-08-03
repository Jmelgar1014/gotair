import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const AddStationNavBar = () => {
  return (
    <>
      <header className="border-b-[1px] border-slate-100 shadow-sm">
        <nav className="p-4">
          <Button className="bg-white hover:bg-gray-100 shadow-none cursor-pointer ">
            <span>
              <svg
                className="text-black"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2z"
                />
              </svg>
            </span>
            <Link className="text-black font-semibold" href="/">
              Back to Home
            </Link>
          </Button>
        </nav>
      </header>
    </>
  );
};

export default AddStationNavBar;
