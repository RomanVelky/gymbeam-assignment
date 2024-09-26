import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAddList } from "@/hooks/api/useAddList";
import { useDeleteList } from "@/hooks/api/useDeleteList";
import { listSchema, ListSchema } from "@/schemas/list.schema";
import { List } from "@/types/mockapi-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

type ListManagerProps = {
  lists: List[];
};

const ListManager = ({ lists }: ListManagerProps) => {
  const t = useTranslations();
  const {
    mutate: deleteList,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteList();
  const {
    mutate: addList,
    isPending: isAdding,
    error: addError,
  } = useAddList();

  const handleDelete = (id: number) => {
    deleteList(id);
  };

  const form = useForm<ListSchema>({
    resolver: zodResolver(listSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values: ListSchema) => {
    try {
      addList({ name: values.username });
      form.reset();
    } catch {
      form.reset();
    }
  };

  return (
    <div>
      <ScrollArea className="h-[200px] sm:max-w-[250px] lg:max-w-[400px] rounded-md border p-4">
        {lists.length === 0 ? (
          <p className="text-center">{t("list-manager.no-lists")}</p>
        ) : (
          <ul className="flex flex-col gap-y-2">
            {lists.map((list) => (
              <li
                key={list.id}
                className="flex items-center justify-between p-2"
              >
                <span>{list.name}</span>
                <Button
                  onClick={() => handleDelete(list.id)}
                  disabled={isDeleting}
                  className="ml-2"
                >
                  <Trash />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
      {deleteError && (
        <p className="text-red-500">
          {t("list-manager.error")}
          {deleteError.message}
        </p>
      )}
      <div className="pt-6">
        <Card className="sm:max-w-[250px] lg:max-w-[400px]">
          <CardHeader>
            <CardTitle> {t("list-manager.create")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> {t("list-manager.add")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("list-manager.name")}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {t("list-manager.name-p")}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isAdding}>
                  {t("list-manager.add-list")}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ListManager;
