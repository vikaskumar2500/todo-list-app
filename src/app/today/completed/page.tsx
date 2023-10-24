import CompletedTodoList from "@/components/CompletedTodoList";
import React from "react";

const Completed = () => {
  return (
    <div className=" max-w-[40rem] h-screen mx-auto pt-32 p-5">
      <CompletedTodoList />
    </div>
  );
};

export default Completed;
