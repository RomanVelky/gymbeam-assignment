import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { todoSchema, TodoFormData } from "../add-todo/add-todo.schema";
import { Card, CardContent } from "@/components/ui/card";
import { useGetTodoById } from "@/hooks/api/useGetTodoById";
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
import { useUpdateTodo } from "@/hooks/api/useUpdateTodo";

interface EditTodoProps {
  todoId: number;
  onCancel: () => void;
}

const EditTodo = ({ todoId, onCancel }: EditTodoProps) => {
  const {
    mutate: updateTodo,
    isPending: isUpdatePending,
    isError: isUpdateError,
  } = useUpdateTodo();
  const {
    data: todo,
    isPending: isGetPending,
    isError: isGetError,
  } = useGetTodoById(todoId);

  const defaultValues: TodoFormData = todo
    ? {
        title: todo.title,
        description: todo.description || "",
        tags: todo.tags || [],
        estimatedTime: todo.estimatedTime || 0,
        actualTimeSpent: todo.actualTimeSpent || 0,
        completed: todo.completed || false,
        priority: (todo.priority as "low" | "medium" | "high") || "low",
        dueDate: todo.dueDate instanceof Date ? todo.dueDate : undefined,
        listId: todo.listId,
      }
    : {
        title: "",
        description: "",
        tags: [],
        estimatedTime: 0,
        actualTimeSpent: 0,
        completed: false,
        priority: "low",
        dueDate: undefined,
        listId: 0,
      };

  const form = useForm<TodoFormData>({
    mode: "onChange",
    resolver: zodResolver(todoSchema),
    defaultValues,
  });

  const onSubmit = async (data: TodoFormData) => {
    try {
      const updatedTodo = {
        ...data,
        completed: data.completed ?? false,
        estimatedTime: data.estimatedTime ?? 0,
        actualTimeSpent: data.actualTimeSpent ?? 0,
        comments: [],
        priority: data.priority ?? "low",
      };

      updateTodo({ todoId: todoId, data: updatedTodo });
      onCancel(); // Call the onCancel callback after successful update
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  if (isUpdatePending) return <div>Loading...</div>;
  if (isUpdateError) return <div>Error loading todo.</div>;

  return (
    <Card className="max-w-sm">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <h3 className="text-2xl font-semibold leading-none tracking-tight pt-6">
              Edit TODO
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
                  <FormLabel>Description</FormLabel>
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
                  <FormLabel>Priority</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                  <FormLabel>Tags</FormLabel>
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
                  <FormDescription>Example: dev,test,prod</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
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
                          e.target.value ? new Date(e.target.value) : undefined
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
                  <FormLabel>Estimated Time</FormLabel>
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
                  <FormLabel>Actual Time Spent</FormLabel>
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
            <Button type="submit">Update Todo</Button>
            <Button type="button" onClick={onCancel} variant="outline">
              Cancel
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditTodo;
