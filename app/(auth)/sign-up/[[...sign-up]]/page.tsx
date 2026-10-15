import { SignUp } from "@clerk/nextjs";
import { Suspense } from "react";

function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
       <Suspense fallback={<p>Loading search…</p>}>
          <SignUp /> 
       </Suspense>
    </div>
  );
}

export default SignUpPage;
