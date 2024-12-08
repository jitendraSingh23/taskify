"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
//interface for todo's types
interface TodoForm {
  title: string;
  description?: string;
  priority: string;
  dueDate?: string;
}

//addtodo component
const AddTodo: React.FC = () => {
  const { data: session } = useSession();
  const [form, setForm] = useState<TodoForm>({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: new Date().toISOString().slice(0, 10)
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //For handling changes in inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  //For handling submit button of add todo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
//title input validation
    if (!form.title) {
      setError("Title is required.");
      setLoading(false);
      return;
    }
//if user is not logged in
    if (!session?.user) {
      alert("You must be logged in to add a todo.");
      setLoading(false);
      return;
    }
//Posting todo to database
    try {
      const response = await fetch("/api/my/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          priority: form.priority,
          dueDate: form.dueDate,
          userId: session.user.id
        })
      });
//creation confirmation
      if (!response.ok) {
        throw new Error("Failed to add todo.");
      }

      alert("Todo added successfully!");
      setForm({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: new Date().toISOString().slice(0, 10)
      });
    } catch (err) {
      setError((err as Error).message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col border-2 px-10 rounded-lg m-10">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex md:flex-row">
          <div>
            <div className="flex flex-col">
              <label className="font-medium mt-2">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Coding"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mt-2">Description</label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Coding from 1pm"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
          </div>
          <div className="flex gap-2 md:gap-0 md:pl-4 md:flex-col ">
            <div className="flex flex-col">
              <label className="font-medium mt-2 ">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 ">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex flex-col  ">
              <label className="font-medium mt-2">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 "
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-5">
          {loading ? "Adding..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
