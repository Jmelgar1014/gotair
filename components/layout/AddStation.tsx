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
    } else {
      setFetchState("Success");
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
          <Input
            placeholder="name"
            value={formData.name}
            onChange={handleChange("name")}
          />
          <Input
            placeholder="address"
            value={formData.address}
            onChange={handleChange("address")}
          />
          <Input
            placeholder="lat"
            value={formData.lat}
            onChange={handleChange("lat")}
          />
          <Input
            placeholder="lng"
            value={formData.lng}
            onChange={handleChange("lng")}
          />
          <Button onClick={() => handleSubmit(formData)}>Add Station</Button>
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
