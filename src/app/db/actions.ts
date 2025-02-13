"use server";

import { db } from ".";
import { todo } from "./schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  return await db.select().from(todo).orderBy(todo.id);
}

export async function addTodo(text: string) {
  await db.insert(todo).values({ text, done: false });
  revalidatePath("/");
}

export async function toggleTodo(id: number, done: boolean) {
  await db.update(todo).set({ done }).where(eq(todo.id, id));
  revalidatePath("/");
}

export async function deleteTodo(id: number) {
  await db.delete(todo).where(eq(todo.id, id));
  revalidatePath("/");
}
