"use client";

import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Circle,
  Loader2,
  Pencil,
  PencilLine,
  Trash2,
} from "lucide-react";
import { Todo, useTodo } from "@/context-api/todo-context";
import AddTodoEditForm from "./AddTodoEditForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ConfirmationDelete from "@/utils/ConfirmationDelete";

const AddTodoItem = ({ data }: any) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [id, setId] = useState<string>("");

  const { deleteTodo, todos, addEditTodo } = useTodo();

  const handleCheckOverCapture = () => {
    setChecked(true);
  };
  const handleCheckOutCaputure = () => {
    setChecked(false);
  };

  const queryClient = useQueryClient();

  // Mutations
  const { mutateAsync: deleteTodsMutate } = useMutation({
    mutationKey: ["delete", "todo"],
    mutationFn: async (id: string) => await deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });

      toast.success("Deleted!");
    },
  });

  const { mutateAsync: completeTodoMutate, isPending: isCompletedPending } =
    useMutation({
      mutationKey: ["complete", "todo"],
      mutationFn: async (todo: Todo) =>
        await fetch("/api/today", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...todo, completed: true }),
        }),
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
        toast.success("Completed!");
      },
    });
  const handleDeleteTodo = async (id: string) => {
    setIsDelete(true);
    setId(() => id);
  };

  const handleCompletedTodo = async (todo: Todo) => {
    await completeTodoMutate(todo);
  };

  const handleEditTodo = (data: Todo) => {
    addEditTodo(data);
    setEditId(() => id);
    setOpen(() => true);
  };

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleConfirmationDelete = async (isTrue: boolean) => {
    if (!isTrue) {
      setIsDelete(false);
      return;
    }
    try {
      await deleteTodsMutate(id);
      setId("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! please try again leter!");
    } finally {
      setIsDelete(false);
    }
  };
  return (
    <div>
      {!open && (
        <li
          key={data.id}
          className="flex items-center justify-between w-full border-b-2 lg:hover:bg-slate-100 cursor-pointer group p-2 rounded-xl"
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
                {isCompletedPending && (
                  <Loader2 className="w-6 h-6 text-blue-500 rounded-full animate-spin" />
                )}
                {!checked && !isCompletedPending && (
                  <Circle className="w-6 opacity-70" />
                )}
                {checked && !isCompletedPending && (
                  <CheckCircle className="lg:block w-6 text-green-500 z-10" />
                )}
              </button>
              <div className="text-base capitalize font-semibold">
                {data.task_name}
              </div>
            </div>
            <div id="right-side" className="ml-8 text-sm">
              {data.description}
            </div>
          </div>
          <div className="lg:hidden flex gap-2 group-hover:flex cursor-pointer mr-2 lg:group-hover:gap-3">
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
              onClick={handleEditTodo.bind(null, data)}
            >
              <PencilLine className="w-6 text-green-600" />
            </button>
          </div>
        </li>
      )}
      {open && <AddTodoEditForm onOpen={handleOpen} editId={editId} />}
      {isDelete && <ConfirmationDelete onClick={handleConfirmationDelete} />}
    </div>
  );
};

export default AddTodoItem;
