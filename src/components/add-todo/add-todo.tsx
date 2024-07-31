import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTodo } from "@/lib/api-service";
import { Todo } from "@/types/mockapi-types";
import { todoSchema, TodoFormData } from "./add-todo.schema";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddTodo = ({
  listId,
  onAdd,
}: {
  listId: number;
  onAdd: (todo: Todo) => void;
}) => {
  // const onSubmit = async (data: TodoFormData) => {
  //   try {
  //     const response = await createTodo({
  //       ...data,
  //       completed: false,
  //       estimatedTime: 0,
  //       actualTimeSpent: 0,
  //       comments: [],
  //       listId: listId,
  //     });
  //     onAdd(response.data);
  //     form.reset();
  //   } catch (error) {
  //     console.error("Error adding todo:", error);
  //     console.log(data);
  //   }
  // };

  const onSubmit = async (data: TodoFormData) => {
    try {
      const response = await createTodo({
        ...data,
        completed: data.completed ?? false,
        estimatedTime: data.estimatedTime ?? 0,
        actualTimeSpent: data.actualTimeSpent ?? 0,
        comments: [],
        listId: listId,
      });
      onAdd(response.data);
      form.reset();
    } catch (error) {
      console.error("Error adding todo:", error);
      console.log("Data that caused the error:", data);
    }
  };

  // const onSubmit = async (data: TodoFormData) => {
  //   try {
  //     const response = await createTodo({
  //       ...data,
  //       completed: data.completed ?? false, // Use the data's completed value if provided
  //       estimatedTime: data.estimatedTime ?? 0,
  //       actualTimeSpent: data.actualTimeSpent ?? 0,
  //       comments: [],
  //       listId: listId,
  //     });
  //     onAdd(response.data);
  //     form.reset();
  //   } catch (error) {
  //     console.error("Error adding todo:", error);
  //     // Optionally log the data that was being submitted
  //     console.log("Data that caused the error:", data);
  //     // Optionally, you might want to show a user-friendly message
  //   }
  // };

  const form = useForm<TodoFormData>({
    mode: "onChange",
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      estimatedTime: 0,
      actualTimeSpent: 0,
      completed: false,
      priority: undefined,
      dueDate: undefined,
      listId: listId,
    },
  });

  return (
    <>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>
                    <FormDescription>Title for the todo item</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Input placeholder="description" {...field} />
                    </FormControl>
                    <FormDescription>
                      description for the todo item
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>priority</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      priority for the todo item
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="tags"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value.split(",").map((tag) => tag.trim())
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>tags for the todo item</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>dueDate</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="dueDate"
                        {...field}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>dueDate for the todo item</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estimatedTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>estimatedTime</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="estimatedTime"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      estimatedTime for the todo item
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="actualTimeSpent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>actualTimeSpent</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="actualTimeSpent"
                        {...field}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      actualTimeSpent for the todo item
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completed</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    </FormControl>
                    <FormDescription>
                      Mark this if the todo item is completed.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddTodo;
