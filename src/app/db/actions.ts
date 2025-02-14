"use server";

import { db } from ".";
import { todo } from "./schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  return await db.select().from(todo).orderBy(todo.id);
}

export async function addTodo(text: string) {
  if (!text?.trim()) {
    throw new Error('Todo text is required');
  }
  try {
    await db.insert(todo).values({ text, done: false });
    revalidatePath("/");
  } catch (error) {
    console.error('Failed to add todo:', error);
    throw new Error('Failed to add todo');
  }
}

export async function toggleTodo(id: number, done: boolean) {
  if (typeof id !== 'number' || id <= 0) {
    throw new Error('Invalid todo id');
  }
  try {
    await db.update(todo).set({ done }).where(eq(todo.id, id));
    revalidatePath("/");
  } catch (error) {
    console.error('Failed to toggle todo:', error);
    throw new Error('Failed to toggle todo');
  }
}

export async function deleteTodo(id: number) {
  if (typeof id !== 'number' || id <= 0) {
    throw new Error('Invalid todo id');
  }
  try {
    await db.delete(todo).where(eq(todo.id, id));
    revalidatePath("/");
  } catch (error) {
    console.error('Failed to delete todo:', error);
    throw new Error('Failed to delete todo');
  }
}
