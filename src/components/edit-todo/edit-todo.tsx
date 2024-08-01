import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateTodo } from "@/hooks/api/useUpdateTodo";
import { Todo } from "@/types/mockapi-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TodoFormData, todoSchema } from "../add-todo/todo.schema";

interface EditTodoProps {
  todo: Todo;
  onCancel: () => void;
}

const EditTodo = ({ todo, onCancel }: EditTodoProps) => {
  const {
    mutate: updateTodo,
    isPending: isUpdatePending,
    isError: isUpdateError,
  } = useUpdateTodo();

  const defaultValues: TodoFormData = {
    title: todo.title,
    description: todo.description || "",
    tags: todo.tags || [],
    estimatedTime: todo.estimatedTime || 0,
    actualTimeSpent: todo.actualTimeSpent || 0,
    completed: todo.completed || false,
    priority: (todo.priority as "low" | "medium" | "high") || "low",
    dueDate: todo.dueDate instanceof Date ? todo.dueDate : undefined,
    listId: todo.listId,
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

      updateTodo({ todoId: todo.id, data: updatedTodo });
      onCancel();
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
                        field.value && !isNaN(new Date(field.value).getTime())
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
