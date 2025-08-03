import { Todo } from "@/types/types";

export const initialTodos: Todo[] = [
  {
    id: crypto.randomUUID(),
    isCompleted: false,
    title: "Item 1",
    description: "Item 1 Description",
  },
  {
    id: crypto.randomUUID(),
    isCompleted: false,
    title: "Item 2",
    description: "Item 2 Description",
  },
];
