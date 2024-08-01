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
import { useAddTodo } from "@/hooks/api/useAddTodo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TodoFormData, todoSchema } from "./todo.schema";
import { useTranslations } from "next-intl";

interface AddTodoProps {
  listId: number;
  clearEdit?: () => void;
}

const AddTodo = ({ listId, clearEdit }: AddTodoProps) => {
  const t = useTranslations();
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

      addTodo(newTodo);
      form.reset();
      if (clearEdit) clearEdit();
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel> {t("todo-forms.title")}</FormLabel>
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
                      <SelectValue placeholder={t("todo-forms.prio-sel")} />
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
                    placeholder={t("todo-forms.date")}
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
          <div className="pt-3 pb-3">
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-1 items-center">
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
          <Button className="w-full" type="submit">
            {t("index.add-todo")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddTodo;
