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
import { SignUpSchema } from "@/lib/validations";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { signup } from "@/actions/signup";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signup(values).then((data) => {
        if (data.error) {
          return setError(data.error);
        }
        if (data.success) {
          setSuccess(data.success);

          setTimeout(() => {
            router.push("/login");
          }, 1500);
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
            <span className="hidden sm:block">Already have an account? </span>
            <Link
              href="/login"
              className="text-main-btn underline underline-offset-2 "
            >
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[400px]">
          <div className="text-center mb-8">
            <h1 className="xl:text-6xl text-5xl font-bold xl:mb-8 mb-6 text-navigation-text">
              Sign Up
            </h1>
            <p className="text-muted-foreground ">
              Join our cooking community and start your culinary journey today!
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm">Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter your name"
                        {...field}
                        className="w-full border-input border-main-paragraph-text rounded-none focus:border-main-btn focus:ring-main-btn"
                      />
                    </FormControl>
                    <FormMessage className="text-navigation-text" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                        className="w-full border-input border-main-paragraph-text rounded-none focus:border-main-btn focus:ring-main-btn"
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
                        disabled={isPending}
                        placeholder="********"
                        type="password"
                        {...field}
                        className="w-full border-input border-main-paragraph-text rounded-none focus:border-main-btn focus:ring-main-btn"
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
                Sign Up
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm text-muted-foreground mt-8">
            © 2024 Cooksy
          </div>
        </div>
      </div>
    </div>
  );
}
