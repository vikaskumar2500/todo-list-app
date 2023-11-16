import CompletedTodoList from "@/components/CompletedTodoList";
import { CheckCircle } from "lucide-react";
import React from "react";

const Completed = () => {
  return (
    <section className="max-w-[40rem] min-h-screen mx-auto pt-36 p-5 ">
      <header className="w-full border-b-[1px] flex items-center gap-2 mb-5 p-2">
        <h2 className="font-bold text-2xl">Completed Task</h2>
        <CheckCircle className="text-green-500" />
      </header>
      <CompletedTodoList />
    </section>
  );
};

export default Completed;
