"use client";

import { useContext, useState } from "react";
import { TodosContext } from "@/context/todos/todos-context";
import { Container } from "@/components/ui/container";
import TodoItem from "@/components/todo-item";
import TodoForm from "@/components/todo-form";
import { Button } from "@/components/ui/button";

type Filter = "all" | "active" | "completed";

export default function TodoList() {
  const { todos, onTodoAdd } = useContext(TodosContext);
  const [filter, setFilter] = useState<Filter>("all");

  let filteredTodos = todos;
  if (filter === "active") {
    filteredTodos = todos.filter((todo) => !todo.isCompleted);
  }
  if (filter === "completed") {
    filteredTodos = todos.filter((todo) => todo.isCompleted);
  }

  const handleTodoFormSubmit = (title: string, description: string): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      isCompleted: false,
      title,
      description,
    };
    onTodoAdd(newTodo);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value as Filter);
  };

  return (
    <section className="mt-8">
      <Container className="w-[min(36rem,100vw)] space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl">Todos</h2>
          <TodoForm task="Add" onTodoFormSubmit={handleTodoFormSubmit}>
            <Button>Add Todo</Button>
          </TodoForm>
        </div>
        <div>
          <ul className="space-y-4">
            {filteredTodos.length === 0 ? (
              <p className="bg-gray-100 p-4 text-center dark:bg-zinc-900">
                You do not have any such tasks
              </p>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            )}
          </ul>
        </div>
        <div className="flex items-center justify-center gap-6 bg-gray-100 p-2 dark:bg-zinc-900">
          <label className="text-gray-500 has-checked:text-black dark:text-gray-400 dark:has-checked:text-white">
            <input
              className="hidden"
              onChange={handleFilterChange}
              name="filter"
              type="radio"
              checked={filter === "all"}
              value="all"
            />
            All
          </label>
          <label className="text-gray-500 has-checked:text-black dark:text-gray-400 dark:has-checked:text-white">
            <input
              className="hidden"
              onChange={handleFilterChange}
              name="filter"
              type="radio"
              checked={filter === "active"}
              value="active"
            />
            Active
          </label>
          <label className="text-gray-500 has-checked:text-black dark:text-gray-400 dark:has-checked:text-white">
            <input
              className="hidden"
              onChange={handleFilterChange}
              name="filter"
              type="radio"
              checked={filter === "completed"}
              value="completed"
            />
            Completed
          </label>
        </div>
      </Container>
    </section>
  );
}
