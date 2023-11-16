"use client";
import { Todo, useTodo } from "@/context-api/todo-context";
import { CheckCircle, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import CompletedTodoItem from "./CompletedTodoItem";
import { useQuery } from "@tanstack/react-query";

const CompletedTodoList = () => {
  const { fetchCompltedTodo } = useTodo();

  const { data: completedTodo, isLoading } = useQuery({
    queryKey: ["completed", "todos"],
    queryFn: async () => {
      const res = await fetch("/api/today/completed", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return await res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full">
        <Loader2 className=" text-blue-500 w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-start gap-5">
      {completedTodo !== null && (
        <ul className="w-full">
          {completedTodo?.map((data: Todo) => (
            <CompletedTodoItem key={data.id} data={data} />
          ))}
        </ul>
      )}
      {(completedTodo === null || completedTodo?.length == 0) && (
        <p className="flex w-full justify-center items-center text-red-700">
          Empty completed todo!!
        </p>
      )}
    </div>
  );
};

export default CompletedTodoList;
