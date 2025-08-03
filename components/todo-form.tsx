"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty" }),
  description: z.string(),
});


interface TodoFormProps {
  children: React.ReactNode;
  task: "Add" | "Edit";
  values?: { title: string; description: string };
  onTodoFormSubmit: (title: string, description: string) => void;
}

export default function TodoForm({ children, task, values, onTodoFormSubmit }: TodoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: values ? values.title : "",
      description: values ? values.description : "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onTodoFormSubmit(values.title, values.description);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task} Todo</DialogTitle>
          <DialogDescription>
            {task === "Add"
              ? "Fill in the details to add a new task."
              : "Modify the task details and save to update your todo."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task Name" {...field} />
                  </FormControl>
                  <FormDescription>This is your todo title</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Task Description" />
                  </FormControl>
                  <FormDescription>
                    This is your todo description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{task} Todo</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
