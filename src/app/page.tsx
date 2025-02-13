import { getTodos } from "./db/actions";
import { TodoItem } from "./components/TodoItem";
import { AddTodo } from "./components/AddTodo";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main>
      <h1 className="mb-4 text-3xl font-bold text-center">Todo App</h1>
      <div className="max-w-md mx-auto">
        <AddTodo />
        <ul className="mt-4 bg-white rounded-lg shadow">
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      </div>
    </main>
  );
}
