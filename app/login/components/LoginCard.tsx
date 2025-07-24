"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth0 } from "@auth0/auth0-react";

type loginInfo = {
  email: string;
  password: string;
};

const LoginCard = () => {
  const { loginWithRedirect } = useAuth0();
  const [loginData, setLoginData] = useState<loginInfo>({
    email: "",
    password: "",
  });

  return (
    <>
      <section className="h-lvh flex flex-col justify-center items-center">
        <div className="my-8">
          <h1 className="text-4xl font-semibold">Got Air ?</h1>
        </div>
        <Card className="w-full max-w-sm justify-center">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link" className="cursor-pointer">
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <button
              onClick={() => {
                loginWithRedirect();
              }}
            >
              login
            </button>
            <Button
              type="submit"
              className="w-full bg-blue-600 cursor-pointer font-semibold hover:bg-blue-800"
              onClick={() => console.log(loginData)}
            >
              Login
            </Button>
            <Button variant="outline" className="w-full cursor-pointer">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </section>
    </>
  );
};

export default LoginCard;
