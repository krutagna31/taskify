"use client";

import { createContext } from "react";
import { Todo } from "@/types/types";

interface TodosState {
  todos: Todo[];
  onTodoAdd: (newTodo: Todo) => void;
  onTodoEdit: (editedTodo: Todo) => void;
  onTodoDelete: (deleteId: string) => void;
}

export const TodosContext = createContext<TodosState>({} as TodosState);
