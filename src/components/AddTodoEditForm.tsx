"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import cuid from "cuid";
import { useTodo } from "@/context-api/todo-context";
import {
  InvalidateQueryFilters,
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Todo } from "@prisma/client";
import { Loader2 } from "lucide-react";

type AddTodoEditFormProps = {
  onOpen: (open: boolean) => void;
  editId: string;
};

const AddTodoEditForm = ({ onOpen, editId }: AddTodoEditFormProps) => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { editTodo } = useTodo();

  useEffect(() => {
    if (editTodo?.id) {
      setTaskName(editTodo?.task_name);
      setDescription(editTodo?.description);
    }
  }, [editTodo?.id]);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["edit", "form", "todos"],
    mutationFn: async () =>
      await fetch("/api/today", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editTodo.id,
          completed: false,
          task_name: taskName,
          description,
        }),
      }),
    onSuccess: () => {
      console.log("Edit form Running");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setDescription("");
      setTaskName("");
      onOpen(false);
    },
  });

  const handleCancelButton = () => {
    onOpen(false);
    setDescription("");
    setTaskName("");
  };
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData: FormData = new FormData(event.currentTarget);
        await mutateAsync(formData as unknown as void);
      }}
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
          className="border rounded-[7px] px-2 py-[0.07rem] bg-slate-100 text-black"
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
          className={`border rounded-[7px] px-2 py-[0.07rem]  text-slate-100 ${
            taskName.length > 0
              ? "cursor-pointer bg-red-700"
              : "cursor-not-allowed bg-red-500/40"
          }`}
        >
          {isPending && (
            <Loader2 className=" text-center w-5 h-6 animate-spin" />
          )}
          {!isPending && <p>Add task</p>}
        </button>
      </div>
    </form>
  );
};

export default AddTodoEditForm;
