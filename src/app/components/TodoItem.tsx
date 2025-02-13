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

  return (
    <li className="flex items-center gap-2 p-3 border-b last:border-b-0">
      <input
        type="checkbox"
        checked={done}
        onChange={(e) => toggleTodo(id, e.target.checked)}
        className="w-5 h-5 border-gray-300 rounded"
      />
      <span className={`flex-grow ${done ? "line-through text-gray-500" : ""}`}>
        {text}
      </span>
      <button
        onClick={async () => {
          setIsDeleting(true);
          await deleteTodo(id);
        }}
        disabled={isDeleting}
        className="px-2 py-1 text-sm text-red-500 hover:text-red-700 disabled:text-gray-400">
        Delete
      </button>
    </li>
  );
}
