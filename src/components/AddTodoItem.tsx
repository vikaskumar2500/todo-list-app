"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, Circle, Pencil, PencilLine, Trash2 } from "lucide-react";
import { Todo, useTodo } from "@/context-api/todo-context";
import AddTodoForm from "./AddTodoForm";
import AddTodoEditForm from "./AddTodoEditForm";

const AddTodoItem = ({ data }: any) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);
  const { deleteTodo, fetchTodos, todos, addEditTodo, addTodos, addTodo } =
    useTodo();

  const handleCheckOverCapture = () => {
    setChecked(true);
  };
  const handleCheckOutCaputure = () => {
    setChecked(false);
  };

  const handleCompletedTodo = (todo: Todo) => {
    deleteTodo(todo.id);
    const updatedTodo: Todo = { ...todo, completed: true };
    addTodos(updatedTodo);
    fetchTodos();
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
    fetchTodos();
  };

  const handleEditTodo = (id: string) => {
    const todo = todos?.filter((todo) => todo.id === id);
    addEditTodo(todo?.at(0) as Todo);
    setEditId(() => id);
    setOpen(() => true);
  };

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  return (
    <div>
      {!open && (
        <li
          key={data.id}
          className="flex items-center justify-between w-full border-b-2 lg:hover:bg-slate-100 cursor-pointer lg:group p-2 rounded-xl"
        >
          <div className="flex flex-col items-start justify-start gap-2">
            <div
              id="left-side"
              className="flex items-center gap-1 justify-center"
            >
              <button
                type="button"
                title="complete todo"
                className="cursor-pointer mt-2"
                onMouseOverCapture={handleCheckOverCapture}
                onMouseOutCapture={handleCheckOutCaputure}
                onClick={handleCompletedTodo.bind(null, data)}
              >
                {!checked && <Circle className="w-6 opacity-70" />}
                {checked && <CheckCircle className="w-6 text-green-500 z-10" />}
              </button>
              <div className="text-base capitalize font-semibold">
                {data.task_name}
              </div>
            </div>
            <div id="right-side" className="ml-8 text-sm">
              {data.description}
            </div>
          </div>
          <div className="lg:hidden flex gap-2 lg:group-hover:flex cursor-pointer mr-2 lg:group-hover:gap-3">
            <button
              type="button"
              title="delete todo"
              className="p-2 rounded-full lg:hover:bg-slate-200 mr-2 lg:mr-0"
              onClick={handleDeleteTodo.bind(null, data.id)}
            >
              <Trash2 className="w-6 text-red-500" />
            </button>
            <button
              type="button"
              title="edit todo"
              className="p-2 rounded-full lg:hover:bg-slate-200"
              onClick={handleEditTodo.bind(null, data.id)}
            >
              <PencilLine className="w-6 text-green-600" />
            </button>
          </div>
        </li>
      )}
      {open && <AddTodoEditForm onOpen={handleOpen} editId={editId} />}
    </div>
  );
};

export default AddTodoItem;
