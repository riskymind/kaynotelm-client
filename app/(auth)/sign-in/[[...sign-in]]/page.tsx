import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Suspense fallback={<p>Loading search…</p>}>
          <SignIn />
      </Suspense>
    </div>
  );
}

export default SignInPage;
