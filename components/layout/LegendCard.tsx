import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const LegendCard = () => {
  return (
    <>
      <Card className="max-w-96 w-full p-4 sm:w-full shadow-md ">
        <CardHeader>
          <CardTitle>Air Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-500 font-semibold">Pump Types</p>
          <p className="my-2">Free Air</p>
          <p className="my-2">Paid Air</p>
        </CardContent>
      </Card>
    </>
  );
};

export default LegendCard;
