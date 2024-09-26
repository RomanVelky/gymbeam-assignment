import { Button } from "@/components/ui/button";
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
import { TodoFormData, todoSchema } from "../../schemas/todo.schema";
import { useTranslations } from "next-intl";

type EditTodoProps = {
  todo: Todo;
  onCancel: () => void;
};

const EditTodo = ({ todo, onCancel }: EditTodoProps) => {
  const t = useTranslations();
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

  if (isUpdatePending) return <div>{t("global.loading")}</div>;
  if (isUpdateError) return <div>{t("global.error")}</div>;

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("todo-forms.title")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("todo-forms.title")} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("todo-forms.desc")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("todo-forms.desc")} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("todo-forms.prio")}</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("todo-forms.desc")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">{t("todo-forms.low")}</SelectItem>
                      <SelectItem value="medium">
                        {t("todo-forms.medium")}
                      </SelectItem>
                      <SelectItem value="high">
                        {t("todo-forms.high")}
                      </SelectItem>
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
                <FormLabel>{t("todo-forms.tags")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("todo-forms.tags")}
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value.split(",").map((tag) => tag.trim())
                      )
                    }
                  />
                </FormControl>
                <FormDescription>{t("todo-forms.tags-p")}</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("todo-forms.date")}</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder={t("todo-forms.desc")}
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
                <FormLabel>{t("todo-forms.estimated")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("todo-forms.estimated")}
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                <FormLabel>{t("todo-forms.actual")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("todo-forms.actual")}
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="pt-4">
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 items-center">
                    <FormLabel>{t("todo-forms.completed")}</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 pt-3">
            <Button className="w-1/2" type="submit">
              {t("todo-forms.update")}
            </Button>
            <Button className="w-1/2" onClick={onCancel} variant="outline">
              {t("todo-forms.cancel")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditTodo;
