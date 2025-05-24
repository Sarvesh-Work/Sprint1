"use client";

import SignUpForm from "@/components/auth-forms/SignUpForm";
import AuthWrapper from "@/components/AuthWrapper";
import Loader from "@/components/Loader";
import { useRedirectIfAuthenticated } from "@/hooks/userHooks";


const SignUpPage = () => {
  const { isLoading, shouldRender } = useRedirectIfAuthenticated();

  if (isLoading || !shouldRender) <Loader />;

  return (
    <AuthWrapper
      title={
        <>
          Join <span className="text-primary">Notix</span>
        </>
      }
      description="Create your account and start organizing your thoughts."
    >
      <SignUpForm />
    </AuthWrapper>
  );
};

export default SignUpPage;
