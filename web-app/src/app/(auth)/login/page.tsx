"use client";
import * as z from "zod";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/validations";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        if (data) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="w-full px-4 py-4">
        <div className="container mx-auto max-w-full px-4 lg:px-20 md:px-10 sm:px-5  flex justify-between items-center py-4 ">
          <Link
            href="/"
            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3C3128] via-[#A4330D] to-[#A4330D]"
          >
            COOKSY
          </Link>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block">
              Don&apos;t have an account?{" "}
            </span>
            <Link
              href="/signup"
              className="text-main-btn underline underline-offset-2"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8">
            <h1 className="xl:text-6xl text-5xl font-bold xl:mb-8 mb-6 text-navigation-text">
              Log In
            </h1>
            <p className="text-muted-foreground">
              Welcome back, chef! Access your recipes and cooking adventures.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Enter your email"
                        type="email"
                        className="w-full border-input border-main-paragraph-text rounded focus:border-main-btn focus:ring-main-btn"
                      />
                    </FormControl>
                    <FormMessage className="text-navigation-text" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="********"
                        type="password"
                        className="w-full border-input border-main-paragraph-text rounded focus:border-main-btn focus:ring-main-btn"
                      />
                    </FormControl>
                    <FormMessage className="text-navigation-text" />
                  </FormItem>
                )}
              />

              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-main-btn hover:bg-second-btn text-white py-6"
              >
                Log In
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm text-muted-foreground mt-8">
            © 2025 Cooksy
          </div>
        </div>
      </div>
    </div>
  );
}
