"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const AddStation = () => {
  const [formData, setFormdata] = useState({
    name: "",
    address: "",
    lat: "",
    lng: "",
  });

  const addStation = useMutation(api.addStation.addStation); // update path if needed

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormdata({ ...formData, [field]: e.target.value });
    };

  const handleSubmit = async () => {
    const lat = parseFloat(formData.lat);
    const lng = parseFloat(formData.lng);

    if (isNaN(lat) || isNaN(lng)) {
      alert("Latitude and Longitude must be numbers");
      return;
    }

    await addStation({
      name: formData.name,
      address: formData.address,
      lat,
      lng,
    });

    setFormdata({ name: "", address: "", lat: "", lng: "" }); // clear form
    alert("Station added!");
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
          <Button onClick={handleSubmit}>Add Station</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddStation;
