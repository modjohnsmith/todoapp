"use client";

import { useState } from "react";
import { toggleTodo, deleteTodo } from "@/app/db/actions";

export function TodoItem({
  id,
  text,
  done,
}: {
  id: number;
  text: string;
  done: boolean;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <li className="flex items-center gap-2 p-3 border-b last:border-b-0" role="listitem">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="checkbox"
        checked={done}
        onChange={async (e) => {
          setError(null);
          setIsToggling(true);
          try {
            await toggleTodo(id, e.target.checked);
          } catch (error) {
            setError('Failed to update todo');
            console.error(error);
          } finally {
            setIsToggling(false);
          }
        }}
        disabled={isToggling || isDeleting}
        aria-label={`Mark todo ${done ? 'incomplete' : 'complete'}`}
        className="w-5 h-5 border-gray-300 rounded"
      />
      <span className={`flex-grow ${done ? "line-through text-gray-500" : ""}`}>
        {text}
      </span>
      <button
        onClick={async () => {
          setError(null);
          setIsDeleting(true);
          try {
            await deleteTodo(id);
          } catch (error) {
            setError('Failed to delete todo');
            console.error(error);
            setIsDeleting(false);
          }
        }}
        disabled={isDeleting || isToggling}
        aria-label="Delete todo"
        className="px-2 py-1 text-sm text-red-500 hover:text-red-700 disabled:text-gray-400">
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </li>
  );
}
