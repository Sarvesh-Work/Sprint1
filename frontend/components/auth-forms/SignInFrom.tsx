"use client";

import { signInApiCall } from "@/apiCalls/auth";
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
import useAuth from "@/hooks/useAuth";
import { signInSchema, SignInSchemaType } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignInForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, mutate } = useAuth(signInApiCall);

  const onSubmit = (data: SignInSchemaType) => {
    const url = "signin/";
    const signInData = {
      url,
      data: {
        email: data.email,
        password: data.password,
      },
    };

    mutate(signInData, {
      onSuccess: () => {
        form.reset();
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          <Button
            type="submit"
            className="w-full mt-3 cursor-pointer font-semibold text-[17px] p-3 text-black"
            disabled={isPending}
          >
            Sign In {isPending && <LoaderCircle className="animate-spin" />}
          </Button>
        </form>
      </Form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Don’t have an account?
        <Link
          href="/signup"
          className="text-primary underline underline-offset-2"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
