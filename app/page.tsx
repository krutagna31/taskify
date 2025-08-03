import Header from "@/components/header";
import TodoList from "@/components/todo-list";

export default function Home() {
  return (
    <>
    <Header />
    <main className="space-y-4">
      <TodoList />
    </main>
    </>
  );
}
