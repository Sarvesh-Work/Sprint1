"use client";

import { signUpApiCall } from "@/apiCalls/auth";
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
import { signUpSchema, SignUpSchemaType } from "@/lib/zod-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const Router = useRouter();
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isPending, mutate: signUp } = useAuth(signUpApiCall);

  const onSubmit = (data: SignUpSchemaType) => {
    const { name, email, password } = data;
    signUp(
      {
        url: "signup/",
        data: {
          name,
          email,
          password,
        },
      },
      {
        onSuccess: () => {
          form.reset();
        },
        onError: (error) => {
          setErrorMessage(error.message);
        },
      }
    );
    form.reset();
  };

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
            Sign Up {isPending && <LoaderCircle className="animate-spin" />}
          </Button>
        </form>
      </Form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="text-primary underline underline-offset-2"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
