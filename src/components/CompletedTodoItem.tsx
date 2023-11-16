"use client";

import { Todo, useTodo } from "@/context-api/todo-context";
import ConfirmationDelete from "@/utils/ConfirmationDelete";
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { CheckCircle, Loader2, PencilLine, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

type todoType = {
  data: Todo;
};

const CompletedTodoItem = ({ data }: todoType) => {
  const [id, setId] = useState<string>("");
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { deleteCompletedTodo } = useTodo();

  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["completed"],
    mutationFn: async (id: string) => await deleteCompletedTodo(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["completed", "todos"] });
      toast.success("deleted task!");
    },
  });
  const handleDeleteTodo = async (id: string) => {
    setIsDelete(true);
    setId(id);
  };

  const handleConfirmationDelete = async (isTrue: boolean) => {
    if (!isTrue) {
      setIsDelete(false);
      return;
    }
    try {
      await mutateAsync(id);
      setId("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDelete(false);
    }
  };

  return (
    <li
      key={data.id}
      className="flex items-center justify-between w-full border-b-2 lg:hover:bg-slate-100 cursor-pointer lg:group p-2 rounded-xl"
    >
      <div className="flex flex-col items-start justify-start gap-2">
        <div id="left-side" className="flex items-center gap-1 justify-center">
          <button
            type="button"
            title="complete todo"
            className="cursor-pointer mt-2"
          >
            <CheckCircle className="w-6 text-green-500 z-10" />
          </button>
          <div className="text-base capitalize font-semibold">
            {data.task_name}
          </div>
        </div>
        <div id="right-side" className="ml-8 text-sm">
          {data.description}
        </div>
      </div>

      <button
        type="button"
        title="delete todo"
        className="p-2 rounded-full lg:hover:bg-slate-200 mr-2 lg:mr-0"
        onClick={handleDeleteTodo.bind(null, data.id)}
      >
      <Trash2 className="w-6 text-red-500" />
      </button>
      {isDelete && <ConfirmationDelete onClick={handleConfirmationDelete} />}
    </li>
  );
};

export default CompletedTodoItem;
