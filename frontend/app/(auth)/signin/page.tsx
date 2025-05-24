"use client";

import SignInForm from "@/components/auth-forms/SignInFrom";
import AuthWrapper from "@/components/AuthWrapper";
import Loader from "@/components/Loader";
import { useRedirectIfAuthenticated } from "@/hooks/userHooks";

const SignInPage = () => {
  const { isLoading, shouldRender } = useRedirectIfAuthenticated();

  if (isLoading || !shouldRender) <Loader />;

  return (
    <AuthWrapper
      title={
        <>
          Sign In to <span className="text-primary">Notix</span>
        </>
      }
      description="Welcome back! Access your notes anytime, anywhere."
    >
      <SignInForm />
    </AuthWrapper>
  );
};

export default SignInPage;
