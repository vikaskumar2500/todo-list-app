"use client";

import React, { useEffect, useState } from "react";
import AddTodoItem from "./AddTodoItem";
import AddTodoForm from "./AddTodoForm";
import { useTodo } from "@/context-api/todo-context";
import { Plus } from "lucide-react";

export type todoType = {
  id: string;
  task_name: string;
  description: string;
  completed: boolean;
};

// const todoData: todoType[] = [
//   {
//     id: "1",
//     task_name: "complete dsa",
//     description: "with in one week",
//     completed: false,
//   },
//   {
//     id: "3",
//     task_name: "complete dsa",
//     description: "with in one week",
//     completed: false,
//   },
//   {
//     id: "5",
//     task_name: "complete dsa",
//     description: "with in one week",
//     completed: false,
//   },
// ];
type AddTodoProps = {
  // onAddTodo: (todoData: todoType) =>void;
  todoData: todoType[] | null;
};

const AddTodoList = () => {
  const [openAddTodo, setOpenAddTodo] = useState<boolean>(false);

  const { fetchTodos, todos } = useTodo();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex flex-col items-start justify-start gap-5">
      <ul className="w-full">
        {todos?.map((data) => (
          <AddTodoItem key={data.id} data={data} />
        ))}
      </ul>
      {openAddTodo && <AddTodoForm setOpenTodo={setOpenAddTodo} />}
      {!openAddTodo && (
        <button
          type="button"
          onClick={() => setOpenAddTodo(true)}
          className="mt-3 group flex items-center justify-center gap-1"
        >
          <Plus className="w-5 h-5 rounded-full lg:group-hover:text-white lg:group-hover:bg-red-600 bg-red-600 text-white" />
          <span className="font-semibold">Add Task</span>
        </button>
      )}
    </div>
  );
};

export default AddTodoList;
