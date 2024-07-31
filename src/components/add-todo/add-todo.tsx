import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createTodo, updateTodo } from "@/lib/api-service";
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
  todoToEdit,
  onEdit,
  clearEdit,
}: {
  listId: number;
  onAdd: (todo: Todo) => void;
  todoToEdit?: Todo | null;
  onEdit?: (todo: Todo) => void;
  clearEdit?: () => void;
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

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
      priority: "low",
      dueDate: undefined,
      listId: listId,
    },
  });

  // useEffect(() => {
  //   if (todoToEdit) {
  //     setIsEditMode(true);
  //     form.reset({
  //       title: todoToEdit.title,
  //       description: todoToEdit.description,
  //       tags: todoToEdit.tags,
  //       estimatedTime: todoToEdit.estimatedTime,
  //       actualTimeSpent: todoToEdit.actualTimeSpent,
  //       completed: todoToEdit.completed,
  //       priority: (todoToEdit.priority as "low" | "medium" | "high") || "low",
  //       dueDate: todoToEdit.dueDate,
  //     });
  //   } else {
  //     setIsEditMode(false);
  //   }
  // }, [todoToEdit, form]);

  useEffect(() => {
    if (todoToEdit) {
      setIsEditMode(true);
      console.log("todoToEdit received:", todoToEdit); // Log the received todoToEdit
      console.log("form reset to", todoToEdit);
      form.reset({
        title: todoToEdit.title,
        description: todoToEdit.description,
        tags: todoToEdit.tags,
        estimatedTime: todoToEdit.estimatedTime,
        actualTimeSpent: todoToEdit.actualTimeSpent,
        completed: todoToEdit.completed,
        priority: (todoToEdit.priority as "low" | "medium" | "high") || "low",
        dueDate: todoToEdit.dueDate,
      });
    } else {
      setIsEditMode(false);
      console.log("No todoToEdit, resetting to default"); // Log when no todoToEdit
      form.reset({
        title: "",
        description: "",
        tags: [],
        estimatedTime: 0,
        actualTimeSpent: 0,
        completed: false,
        priority: "low",
        dueDate: undefined,
        listId: listId,
      });
    }
  }, [todoToEdit, form, listId]);

  // const onSubmit = async (data: TodoFormData) => {
  //   try {
  //     if (isEditMode && todoToEdit) {
  //       const updatedTodo = { ...todoToEdit, ...data };
  //       const response = await updateTodo(todoToEdit.id, updatedTodo);
  //       if (onEdit) onEdit(response.data);
  //     } else {
  //       const response = await createTodo({
  //         ...data,
  //         completed: data.completed ?? false,
  //         estimatedTime: data.estimatedTime ?? 0,
  //         actualTimeSpent: data.actualTimeSpent ?? 0,
  //         comments: [],
  //         priority: data.priority ?? "low",
  //         listId: listId,
  //       });
  //       onAdd(response.data);
  //     }
  //     form.reset();
  //     if (clearEdit) clearEdit();
  //   } catch (error) {
  //     console.error("Error submitting todo:", error);
  //     console.log("Data that caused the error:", data);
  //   }
  // };

  const onSubmit = async (data: TodoFormData) => {
    try {
      if (isEditMode && todoToEdit) {
        console.log("updated todo");
        await updateTodo(todoToEdit.id, {
          title: data.title,
          description: data.description,
          priority: data.priority,
          dueDate: data.dueDate,
          tags: data.tags,
          completed: data.completed,
          estimatedTime: data.estimatedTime,
          actualTimeSpent: data.actualTimeSpent,
          listId: listId,
        });
        if (onEdit) onEdit({ ...todoToEdit, ...data });
      } else {
        console.log("created todo");
        const response = await createTodo({
          ...data,
          completed: data.completed ?? false,
          estimatedTime: data.estimatedTime ?? 0,
          actualTimeSpent: data.actualTimeSpent ?? 0,
          comments: [],
          priority: data.priority ?? "low",
          listId: listId,
        });
        //onAdd(response.data);
      }
      form.reset();
      if (clearEdit) clearEdit();
    } catch (error) {
      console.error("Error submitting todo:", error);
      console.log("Data that caused the error:", data);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
              <h3 className="text-2xl font-semibold leading-none tracking-tight pt-6">
                {isEditMode ? "Edit TODO" : "Add TODO"}
              </h3>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>
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
                    <FormDescription>example: dev,test,prod</FormDescription>
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
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isEditMode ? "Edit Todo" : "Add Todo"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddTodo;
