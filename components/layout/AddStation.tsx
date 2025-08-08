"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { Alert, AlertTitle } from "../ui/alert";
import { addStationAdmin } from "@/schema/addStationSchema";
import { z } from "zod";

interface jwtType {
  jwt: string;
}

const AddStation = ({ jwt }: jwtType) => {
  const [fetchState, setFetchState] = useState<string>("");

  // type formType = {
  //   name: string;
  //   address: string;
  //   lat: string;
  //   lng: string;
  // };

  type addStationType = z.infer<typeof addStationAdmin>;
  const [formData, setFormdata] = useState<addStationType>({
    name: "",
    address: "",
    lat: 0,
    lng: 0,
  });

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormdata({ ...formData, [field]: e.target.value });
    };

  const handleSubmit = async (formData: addStationType) => {
    const parsed = addStationAdmin.safeParse(formData);

    if (!parsed.success) {
      console.log("there is an error with input");
      return;
    }

    try {
      const response = await fetch("/api/stations", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        console.log("There is an error");
        setFetchState("Error");

        setTimeout(() => {
          setFetchState("");
        }, 5000);
      } else {
        setFetchState("Success");
        setTimeout(() => {
          setFetchState("");
        }, 5000);
      }
      setFormdata({ name: "", address: "", lat: 0, lng: 0 }); // clear form
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center m-2">
      <Card className="w-full max-w-96 p-4 sm:w-full shadow-md">
        <CardHeader>
          <CardTitle>Add Station</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(formData);
            }}
          >
            <Input
              className="my-2"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange("name")}
            />
            <Input
              className="my-2"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange("address")}
            />
            <Input
              className="my-2"
              type="number"
              placeholder="Latitude"
              value={formData.lat}
              onChange={handleChange("lat")}
            />
            <Input
              className="my-2"
              type="number"
              placeholder="Longitude"
              value={formData.lng}
              onChange={handleChange("lng")}
            />
            <Button type="submit" className="w-full cursor-pointer">
              Add Station
            </Button>
          </form>
          {fetchState === "Error" && (
            <Alert variant="default">
              {/* <Terminal /> */}
              <AlertTitle>Station was not added there is an error</AlertTitle>
            </Alert>
          )}

          {fetchState === "Success" && (
            <Alert variant="default">
              {/* <Terminal /> */}
              <AlertTitle>Station Added Successfully</AlertTitle>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddStation;
