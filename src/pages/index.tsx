import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import { useGetList } from "@/hooks/api/useGetLists";
import { useAddList } from "@/hooks/api/useAddList";
import { useDeleteList } from "@/hooks/api/useDeleteList";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { Trash } from "lucide-react";
import { Pen } from "lucide-react";
import { ScrollText } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Home = () => {
  const t = useTranslations();
  const { data, isPending, isError } = useGetList();
  const { mutate: addList, isPending: isPendingAddlist, error } = useAddList();
  const {
    mutate: deleteList,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteList();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      addList({ name: values.username });
    } catch (error) {
      console.error("Error adding list:", error);
    }
  }
  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;

  const handleDelete = (id: number) => {
    deleteList(id);
  };

  return (
    <main className="min-h-svh flex flex-col items-center gap-y-8">
      <h1 className="text-center text-7xl">{t("test")}</h1>
      <ul className="flex flex-col gap-y-4">
        {data.map((list) => (
          <div key={list.id}>
            <li>{list.name}</li>
            <Button onClick={() => handleDelete(list.id)}>
              <Trash />
            </Button>
          </div>
        ))}
      </ul>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const messages = (await import(`../messages/${context.locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};
