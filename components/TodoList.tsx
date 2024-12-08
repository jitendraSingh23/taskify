"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Deleteicon, Markdone } from "@/img/img";
//todos type interface
interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  isCompleted: boolean;
}
//interface for todo status
interface TodoListProps {
  isCompleted: boolean;
}

const TodoList = ({ isCompleted }: TodoListProps) => {
  const { data: session, status } = useSession();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>("");
//fetching todos from database
  useEffect(() => {
    const fetchTodos = async () => {
      if (status === "unauthenticated") {
        setError("You must be logged in to view your todos.");
        return;
      }

      try {
        const res = await fetch("/api/my/todos");
        if (!res.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await res.json();
        setTodos(data.todos);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (session?.user?.id) {
      fetchTodos();
    }
  }, [session, status]);

  //For handling the button -mark as done or mark as completed
  const handleMarkAsDone = async (todoId: number) => {
    try {
      const response = await fetch("/api/my/todos/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ todoId })
      });

      if (response.ok) {
        setTodos(prev =>
          prev.map(todo =>
            todo.id === todoId ? { ...todo, isCompleted: true } : todo
          )
        );
      } else {
        console.error("Failed to mark as done");
      }
    } catch (error) {
      console.error("Error marking todo as done:", error);
    }
  };

  //for handling button - delete todo 
  const handleDelete = async (todoId: number) => {
    try {
      const response = await fetch("/api/my/todos/ ", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ todoId })
      });

      if (response.ok) {
        setTodos(prev => prev.filter(todo => todo.id !== todoId));
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const filteredTodos = todos.filter(todo => todo.isCompleted === isCompleted);

  if (status === "loading") {
    return (
      <div className="animate-pulse w-80 md:w-96 mx-10">
        <h2 className="text-xl font-semibold py-1 h-4 my-4 bg-gray-200 rounded w-full"></h2>
        <ul className="flex flex-col gap-3 w-full">
          <li>
            <div className="flex border-2 p-4 rounded-lg justify-between ">
              <div className="flex flex-col min-h-20 bg-gray-100 w-full">
                <div className="w-1/2 h-4 bg-gray-300 my-2 rounded"></div>
                <p className="w-3/4 h-4 bg-gray-300 my-2 rounded"></p>
                <div className="flex gap-6">
                  <p className="w-1/2 h-4 bg-gray-300 my-2 rounded"></p>
                  <p className="w-1/2 h-4 bg-gray-300 my-2 rounded"></p>
                  <p className="w-1/2 h-4 bg-gray-300 my-2 rounded"></p>
                </div>
              </div>
              <div className="flex flex-col gap-4 pl-4">
                <button className="bg-gray-200 rounded-full p-1.5 mb-2 h-7 w-7"></button>
                <button className="bg-gray-200 rounded-full p-1.5  mb-2 h-7 w-7"></button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="">
      {error && <p>Error: {error}</p>}
      <h2 className="text-xl font-semibold py-1">
        {isCompleted ? "Completed Todos" : "Pending Todos"}
      </h2>
      {filteredTodos.length === 0 ? (
        <p>No todos available</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              className="flex border-2 p-4 rounded-lg justify-between">
              <div className="flex flex-col min-h-20">
                <div className="flex flex-col">
                  <h3 className="text-lg uppercase ">{todo.title} </h3>
                  <p className="break-words">{todo.description}</p>
                </div>
                <div className="flex gap-6">
                  <p className="text-sm text-slate-500">
                    {new Date(todo.dueDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-slate-500">{todo.priority}</p>
                  <p className="text-sm text-slate-500">
                    {todo.isCompleted ? "Completed" : "Pending"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 pl-4 ">
                {!todo.isCompleted && (
                  <button
                    onClick={() => handleMarkAsDone(todo.id)}
                    className="bg-black text-white rounded-full p-1.5 ">
                    <Markdone />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-black text-white rounded-full p-1.5 ">
                  <Deleteicon />
                </button>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
