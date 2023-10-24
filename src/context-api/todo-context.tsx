"use client";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export type Todo = {
  id: string;
  task_name: string;
  description: string;
  completed: boolean;
};

export type todoState = {
  todos: Todo[] | null;
  addTodo: (todo: Todo) => void;
  addEditTodo: (todo: Todo) => void;
  fetchTodos: () => Promise<void>;
  addTodos: (todos: Todo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  editTodo: Todo;
  completedTodo: Todo[] | null;
  addCompletedTodo: (todo: Todo) => void;
  fetchCompltedTodo: () => Promise<void>;
  deleteCompletedTodo: (id: string) => Promise<void>;
};

export const TodoContext = createContext<todoState>({} as todoState);

const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodo, setEditTodo] = useState<Todo>({} as Todo);
  const [completedTodo, setCompletedTodo] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    // Implement your logic to add a todo
    if (!todo.completed) setTodos([...todos, todo]);
  };

  const addCompletedTodo = (todo: Todo) => {
    if (todo.completed) setCompletedTodo([...completedTodo, todo]);
  };

  const addEditTodo = (todo: Todo) => {
    setEditTodo(todo);
  };

  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/today", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodos = async (todo: Todo) => {
    try {
      const res = await fetch("/api/today", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
      });
      const data = await res.json();
      addTodo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const res = await fetch("/api/today", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompltedTodo = async () => {
    try {
      const res = await fetch("/api/today/completed", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCompletedTodo(() => data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCompletedTodo = async (id: string) => {
    try {
      await fetch("/api/today/completed", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        fetchTodos,
        addTodos,
        deleteTodo,
        addEditTodo,
        editTodo,
        completedTodo,
        addCompletedTodo,
        fetchCompltedTodo,
        deleteCompletedTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;

export const useTodo = () => useContext(TodoContext);
