"use client";

import { useState } from "react";
import { addTodo } from "@/app/db/actions";

export function AddTodo() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        if (text.trim()) {
          setIsLoading(true);
          try {
            await addTodo(text);
            setText("");
          } catch (error) {
            setError("Failed to add todo");
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        }
      }}
      className="flex gap-2">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo"
        aria-label="New todo text"
        disabled={isLoading}
        className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        className="px-4 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        {isLoading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
