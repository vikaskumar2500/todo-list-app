"use client";

import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import cuid from "cuid";
import { useTodo } from "@/context-api/todo-context";

type AddTodoFormProps = {
  setOpenTodo: Dispatch<SetStateAction<boolean>>;
};

let check: boolean = false;

const AddTodoForm = ({ setOpenTodo }: AddTodoFormProps) => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { addTodos, editTodo, deleteTodo } = useTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskName.trim().length === 0) return;
    const formData = {
      task_name: taskName,
      description: description,
      id: cuid(),
      completed: false,
    };
    addTodos(formData);
    setDescription("");
    setTaskName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col h-[150px] w-full ring-2 ring-offset-slate-400 rounded-lg mt-3 items-start p-3 gap-5"
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
      <hr className="absolute border-spacing-2 bg-slate-700/90 left-0 w-full top-[100px]" />
      <div className="absolute right-5 bottom-1  flex items-end justify-end gap-3 mb-1 ">
        <button
          type="button"
          className="border rounded-md px-2 py-[0.15rem] bg-slate-100 text-black"
          onClick={() => setOpenTodo(false)}
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
          className={`border rounded-md px-2 py-[0.15rem]  text-slate-100 ${
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

export default AddTodoForm;
