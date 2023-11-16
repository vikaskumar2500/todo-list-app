import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center w-full min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <p className="text italic">Would you like to add you Task?</p>
        <Link href={"/today"} className="no-underline border px-3 rounded-[8px] text-slate-100 py-[0.15rem] bg-lime-500">
          Add Task
        </Link>
      </div>
    </main>
  );
}
