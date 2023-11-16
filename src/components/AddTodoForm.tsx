"use client";

import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import cuid from "cuid";
import { Todo, useTodo } from "@/context-api/todo-context";
import {
  InvalidateQueryFilters,
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

type AddTodoFormProps = {
  setOpenTodo: Dispatch<SetStateAction<boolean>>;
};

const AddTodoForm = ({ setOpenTodo }: AddTodoFormProps) => {
  const [taskName, setTaskName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { addTodos } = useTodo();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["form", "todos"],
    mutationFn: async () => {
      await addTodos({
        task_name: taskName,
        description,
        id: cuid(),
        completed: false,
      });
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setOpenTodo(false);
      setDescription("");
      setTaskName("");
    },
  });

  return (
    <form
      onSubmit={async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData: FormData = new FormData(event.currentTarget);
        await mutateAsync(formData as unknown as void);
      }}
      className="relative flex flex-col h-[150px] mb-5a w-full ring-2 ring-offset-slate-400 rounded-xl mt-3 items-start p-3 gap-5"
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
          className="border rounded-[8px] px-2 py-[0.15rem] bg-slate-100 text-black"
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
          className={` flex items-center border text-center rounded-[8px] px-2 py-[0.15rem]  text-slate-100 ${
            taskName.length > 0
              ? "cursor-pointer bg-red-700"
              : "cursor-not-allowed bg-red-500/40"
          }`}
        >
          {isPending && <Loader2 className=" text-center w-6 h-6 animate-spin" />}
          {!isPending && <p>Add task</p>}
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
