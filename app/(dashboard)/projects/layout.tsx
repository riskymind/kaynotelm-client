import { Sidebar } from "@/components/layout/Sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Suspense fallback={null}>
          <RequireAuth>{children}</RequireAuth>
        </Suspense>
      </main>
    </div>
  );
}

async function RequireAuth({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return children;
}
