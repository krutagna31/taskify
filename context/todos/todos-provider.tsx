"use client";

import { useReducer } from "react";
import { TodosContext } from "@/context/todos/todos-context";
import { Todo } from "@/types/types";
import { initialTodos } from "@/data/initial-todos";

type TodosAction =
  | { type: "add-todo"; newTodo: Todo }
  | { type: "edit-todo"; editedTodo: Todo }
  | { type: "delete-todo"; deleteId: string };

function todosReducer(todos: Todo[], action: TodosAction): Todo[] {
  switch (action.type) {
    case "add-todo": {
      return [...todos, action.newTodo];
    }

    case "edit-todo": {
      return todos.map((todo) =>
        todo.id === action.editedTodo.id ? action.editedTodo : todo,
      );
    }

    case "delete-todo": {
      return todos.filter((todo) => todo.id !== action.deleteId);
    }

    default:
      throw new Error("Unknown action");
  }
}

interface TodosProviderProps {
  children: React.ReactNode;
}

export default function TodosProvider({ children }: TodosProviderProps) {
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  const handleTodoAdd = (newTodo: Todo) => {
    dispatch({ type: "add-todo", newTodo });
  };

  const handleTodoEdit = (editedTodo: Todo) => {
    dispatch({ type: "edit-todo", editedTodo });
  };

  const handleTodoDelete = (deleteId: string): void => {
    dispatch({ type: "delete-todo", deleteId });
  };

  const value = {
    todos: todos,
    onTodoAdd: handleTodoAdd,
    onTodoEdit: handleTodoEdit,
    onTodoDelete: handleTodoDelete,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}
