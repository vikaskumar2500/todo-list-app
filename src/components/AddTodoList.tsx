"use client";

import React, { useEffect, useState } from "react";
import AddTodoItem from "./AddTodoItem";
import AddTodoForm from "./AddTodoForm";
import { useTodo } from "@/context-api/todo-context";
import { Loader2, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export type todoType = {
  id: string;
  task_name: string;
  description: string;
  completed: boolean;
};

type AddTodoProps = {
  // onAddTodo: (todoData: todoType) =>void;
  todoData: todoType[] | null;
};

const AddTodoList = () => {
  const [openAddTodo, setOpenAddTodo] = useState<boolean>(false);

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      console.log("query function running");
      const res = await fetch("/api/today", {
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
    <div className="flex flex-col items-start justify-start gap-5 mb-10">
      {todos !== null && (
        <ul className="w-full">
          {todos?.map((data: any) => (
            <AddTodoItem key={data.id} data={data} />
          ))}
        </ul>
      )}
      {(todos === null || todos?.length == 0) && (
        <p className="flex w-full justify-center items-center text-red-700">
          Please add your todo now!
        </p>
      )}
      {openAddTodo && <AddTodoForm setOpenTodo={setOpenAddTodo} />}
      {!openAddTodo && (
        <button
          type="button"
          onClick={() => setOpenAddTodo(true)}
          className="mt-3 mb-5 group flex items-center justify-center gap-1"
        >
          <Plus className="w-5 h-5 rounded-full lg:group-hover:text-white lg:group-hover:bg-red-600 border" />
          <span className="font-semibold">Add Task</span>
        </button>
      )}
    </div>
  );
};

export default AddTodoList;
