"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { location } from "@/schema/locationSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface jwtInfo {
  /** Retrieved securely from auth provider */
  token: string;
}

const LocationForm = ({ token }: jwtInfo) => {
  const labels: string[] = ["name", "address", "city", "state"];

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
      toast.success("Successfully Submitted", { duration: 5_000 });
      console.log(response);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="p-4 m-4  ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8  rounded-md p-4 border max-w-4xl mr-auto ml-auto"
          >
            {labels.map((label) => (
              <FormField
                key={label}
                control={form.control}
                name={label as keyof z.infer<typeof location>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={label} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-blue-600 hover:bg-blue-800 cursor-pointer w-full sm:w-44"
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
