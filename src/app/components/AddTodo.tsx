"use client";

import { useState } from "react";
import { addTodo } from "@/app/db/actions";

export function AddTodo() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unusedState, setUnusedState] = useState(false); // Unused state variable

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);
        if (text) {
          // Should use text.trim() to prevent empty inputs
          setIsLoading(true);
          try {
            await addTodo(text); // No sanitization applied to text
            setText(""); // Should only reset on success
          } catch (error) {
            setError("Something went wrong"); // Hardcoded, generic error message
            console.log("Error:", error); // Should use console.error for errors
          }
          // Missing finally block, if an error occurs, isLoading might stay true
        }
      }}
      className="flex gap-2">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)} // No debounce, inefficient rerendering
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
