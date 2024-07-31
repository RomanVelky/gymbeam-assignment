import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { todoSchema, TodoFormData } from "./add-todo.schema";
import { Card, CardContent } from "@/components/ui/card";
import { useAddTodo } from "@/hooks/api/useAddTodo";
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

interface AddTodoProps {
  listId: number;
  clearEdit?: () => void;
}

const AddTodo = ({ listId, clearEdit }: AddTodoProps) => {
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

  const { mutate: addTodo } = useAddTodo();

  const onSubmit = async (data: TodoFormData) => {
    try {
      const newTodo = {
        ...data,
        completed: data.completed ?? false,
        estimatedTime: data.estimatedTime ?? 0,
        actualTimeSpent: data.actualTimeSpent ?? 0,
        comments: [],
        priority: data.priority ?? "low",
        listId: listId, // Ensure this is used correctly
      };

      await addTodo(newTodo);
      form.reset();
      if (clearEdit) clearEdit();
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
  };

  return (
    <>
      <Card className="max-w-sm">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
              <h3 className="text-2xl font-semibold leading-none tracking-tight pt-6">
                Add TODO
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
              <Button type="submit">Add Todo</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default AddTodo;
