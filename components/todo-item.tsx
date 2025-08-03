"use client";

import { useContext } from "react";
import { TodosContext } from "@/context/todos/todos-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import TodoForm from "@/components/todo-form";
import { Todo } from "@/types/types";
import { Eye, Trash2, SquarePen } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { onTodoDelete, onTodoEdit } = useContext(TodosContext);

  const handleIsCompletedChange = (checked: CheckedState) => {
    onTodoEdit({ ...todo, isCompleted: checked as boolean });
  };

  const handleTodoFormSubmit = (title: string, description: string): void => {
    onTodoEdit({ ...todo, title, description });
  };

  return (
    <li
      className="flex items-center justify-between bg-gray-100 p-4 dark:bg-zinc-900"
      key={todo.id}
    >
      <div className="flex items-center space-x-4">
        <Checkbox
          checked={todo.isCompleted}
          onCheckedChange={handleIsCompletedChange}
        />
        {todo.isCompleted ? (
          <del className="text-gray-400">{todo.title}</del>
        ) : (
          <span>{todo.title}</span>
        )}
      </div>
      <div className="space-x-4">
        <Dialog>
          <DialogTrigger>
            <Eye size={18} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{todo.title}</DialogTitle>
              <DialogDescription>{todo.description}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <TodoForm
          task="Edit"
          values={{ title: todo.title, description: todo.description }}
          onTodoFormSubmit={handleTodoFormSubmit}
        >
          <button>
            <SquarePen size={18} />
          </button>
        </TodoForm>
        <button
          onClick={() => {
            onTodoDelete(todo.id);
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
}
