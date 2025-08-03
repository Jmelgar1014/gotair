"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { location } from "@/schema/locationSchema";
import { z } from "zod";
import { fetchMutation } from "convex/nextjs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface jwtInfo {
  /** Retrieved securely from auth provider */
  token: string;
}

const LocationForm = ({ token }: jwtInfo) => {
  const form = useForm<z.infer<typeof location>>({
    resolver: zodResolver(location),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof location>) => {
    try {
      const insertLocation = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Example: token would come from secure auth context in production
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      const response = await insertLocation.json();
      console.log(response);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="p-4 m-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8  rounded-md p-4 border"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-800 cursor-pointer"
            >
              Submit
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
};

export default LocationForm;
