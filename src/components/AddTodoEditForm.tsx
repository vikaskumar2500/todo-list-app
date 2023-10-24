"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import cuid from "cuid";
import { useTodo } from "@/context-api/todo-context";

type AddTodoEditFormProps = {
  onOpen: (open: boolean) => void;
  editId: string;
};

const AddTodoEditForm = ({ onOpen, editId }: AddTodoEditFormProps) => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { addTodos, editTodo, deleteTodo, fetchTodos } = useTodo();

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (editTodo?.id) {
      setTaskName(editTodo?.task_name);
      setDescription(editTodo?.description);
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteTodo(editId);
    fetchTodos();
    const formData = {
      task_name: taskName,
      description: description,
      id: cuid(),
      completed: false,
    };
    addTodos(formData);
    setDescription("");
    setTaskName("");
    onOpen(false);
  };

  const handleCancelButton = () => {
    onOpen(false);
    setDescription("");
    setTaskName("");
  };
  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
      className="relative flex flex-col h-[120px] w-full ring-2 ring-offset-slate-400 rounded-lg mt-3 items-start p-3 gap-5"
    >
      <input
        id="taskname"
        placeholder="task name"
        className="w-full outline-none px-2 placeholder:font-semibold font-semibold"
        value={taskName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTaskName(e.target.value)
        }
      />
      <input
        id="description"
        placeholder="description"
        className="w-full outline-none px-2 text-sm"
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
      />
      <hr className="absolute border-spacing-2 bg-slate-700/90 left-0 w-full top-[80px]" />
      <div className="absolute right-5 bottom-1  flex items-end justify-end gap-3 ">
        <button
          type="button"
          className="border rounded-md px-2 py-[0.07rem] bg-slate-100 text-black"
          onClick={handleCancelButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          title={`${
            taskName.trim.length > 0
              ? "Add your todo"
              : "please write your todo!"
          }`}
          className={`border rounded-md px-2 py-[0.07rem]  text-slate-100 ${
            taskName.length > 0
              ? "cursor-pointer bg-red-700"
              : "cursor-not-allowed bg-red-500/40"
          }`}
        >
          Add task
        </button>
      </div>
    </form>
  );
};

export default AddTodoEditForm;
