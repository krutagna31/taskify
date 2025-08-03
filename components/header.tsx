import { Container } from "@/components/ui/container";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="py-4">
      <Container className="flex items-center justify-between">
        <h1 className="text-3xl">Taskify</h1>
        <ModeToggle />
      </Container>
    </header>
  );
}

