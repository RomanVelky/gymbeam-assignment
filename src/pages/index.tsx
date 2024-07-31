import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import { useGetList } from "@/hooks/api/useGetLists";
import { Button } from "@/components/ui/button";
import ListManager from "@/components/list-manager";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ListSelector from "@/components/list-selector";
import AddTodo from "@/components/add-todo/add-todo";
import TodoList from "@/components/todo-list";

const Home = () => {
  const t = useTranslations();
  const { data, isPending, isError } = useGetList();
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const handleSelect = (listId: number) => {
    console.log("Selected list ID:", listId);
    setSelectedListId(listId);
  };

  if (isPending) return <h1>Loading...</h1>;
  if (isError) return <h1>Error</h1>;
  return (
    <main className="min-h-svh flex flex-col items-center gap-y-4">
      <div className="flex gap-4 justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Manage Lists</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[300px] sm:max-w-[300px] lg:max-w-[450px] overflow-auto lg:max-h-fit max-h-screen rounded-lg">
            <DialogHeader>
              <DialogTitle>Manage Lists</DialogTitle>
              <DialogDescription>
                Make changes to your lists here. Click exit when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className=" py-4">
              <div className=" items-center ">
                <ListManager lists={data} />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Todo</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[300px] sm:max-w-[300px] lg:max-w-[450px] max-h-screen lg:max-h-fit overflow-auto rounded-lg">
            <DialogHeader>
              <DialogTitle>Add Todo</DialogTitle>
              <DialogDescription>Make your Todo</DialogDescription>
            </DialogHeader>
            <div className=" py-4">
              <div className=" items-center ">
                <AddTodo listId={selectedListId ?? 1} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ListSelector onSelect={handleSelect} />

      <TodoList listId={selectedListId ?? 1} />
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
