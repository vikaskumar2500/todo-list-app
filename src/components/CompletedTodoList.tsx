"use client";
import { Todo, useTodo } from "@/context-api/todo-context";
import { CheckCircle } from "lucide-react";
import React, { useEffect } from "react";
import CompletedTodoItem from "./CompletedTodoItem";

const CompletedTodoList = () => {
  const { completedTodo, fetchCompltedTodo } = useTodo();

  useEffect(() => {
    fetchCompltedTodo();
  }, []);

  return (
    <div className="flex flex-col items-start justify-start gap-5">
      <div className="w-full border-b-[1px] flex items-center gap-2 mb-5 p-2">
        <h2 className="font-bold text-xl">Completed Task</h2>
        <CheckCircle className="text-green-500" />
      </div>
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
