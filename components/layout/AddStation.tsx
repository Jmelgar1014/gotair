"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { Alert, AlertTitle } from "../ui/alert";

const AddStation = () => {
  const [fetchState, setFetchState] = useState<string>("");

  type formType = {
    name: string;
    address: string;
    lat: string;
    lng: string;
  };
  const [formData, setFormdata] = useState<formType>({
    name: "",
    address: "",
    lat: "",
    lng: "",
  });

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormdata({ ...formData, [field]: e.target.value });
    };

  const handleSubmit = async (formData: {
    name: string;
    address: string;
    lat: string;
    lng: string;
  }) => {
    const response = await fetch("/api/stations", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
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

    setFormdata({ name: "", address: "", lat: "", lng: "" }); // clear form
  };

  return (
    <div className="flex justify-center m-4">
      <Card className="w-full max-w-96 p-4 sm:w-96 shadow-md">
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
              placeholder="Latitude"
              value={formData.lat}
              onChange={handleChange("lat")}
            />
            <Input
              className="my-2"
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
