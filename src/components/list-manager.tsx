import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useDeleteList } from "@/hooks/api/useDeleteList";
import { useAddList } from "@/hooks/api/useAddList";
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
import { List } from "@/types/mockapi-types";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listSchema, ListSchema } from "@/schemas/list.schema";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ListManagerProps {
  lists: List[];
}

const ListManager = ({ lists }: ListManagerProps) => {
  const queryClient = useQueryClient();
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
    } catch (error) {
      console.error("Error adding list:", error);
      form.reset();
    }
  };
  return (
    <div>
      <ScrollArea className="h-[200px] sm:max-w-[250px] lg:max-w-[400px] rounded-md border p-4">
        <ul className="flex flex-col gap-y-4">
          {lists.map((list) => (
            <div key={list.id} className="flex items-center justify-between">
              <li>{list.name}</li>
              <Button
                onClick={() => handleDelete(list.id)}
                disabled={isDeleting}>
                <Trash />
              </Button>
            </div>
          ))}
        </ul>
      </ScrollArea>
      {deleteError && (
        <p className="text-red-500">
          Error deleting list: {deleteError.message}
        </p>
      )}
      <div className="pt-6">
        <Card className="sm:max-w-[250px] lg:max-w-[400px]">
          <CardHeader>
            <CardTitle>Create List</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add new list</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is name for your new list.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isAdding}>
                  Add List
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
