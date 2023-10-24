"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    redirect("/today");
  }, []);
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <p className="w-full text-center flex items-center justify-center">
        Loading...
      </p>
    </main>
  );
}
