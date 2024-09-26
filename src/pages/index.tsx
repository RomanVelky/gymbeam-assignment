import AddTodo from "@/components/add-todo/add-todo";
import ListManager from "@/components/list-manager";
import ListSelector from "@/components/list-selector";
import TodoList from "@/components/todo-list";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetList } from "@/hooks/api/useGetLists";
import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Home = () => {
  const t = useTranslations();
  const { data, isPending, isError } = useGetList();
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const handleSelect = (listId: number) => {
    setSelectedListId(listId);
  };

  if (isPending) return <h1>{t("global.loading")}</h1>;
  if (isError) return <h1>{t("global.error")}</h1>;

  return (
    <main className="min-h-svh flex flex-col items-center gap-y-4">
      <div className="text-center pt-4 pb-6 text-6xl">
        {t("todo-list.manage")}
      </div>
      <div className="grid grid-cols-2 gap-4 justify-center max-w-xs w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">{t("index.manage-lists")}</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[300px] sm:max-w-[300px] lg:max-w-[450px] overflow-auto lg:max-h-fit max-h-screen rounded-lg">
            <DialogHeader>
              <DialogTitle>{t("index.manage-lists")}</DialogTitle>
              <DialogDescription>{t("index.manage-lists-p")}</DialogDescription>
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
            <Button className="w-full">{t("index.add-todo")}</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[300px] sm:max-w-[300px] lg:max-w-[450px] max-h-screen lg:max-h-fit overflow-auto rounded-lg">
            <DialogHeader>
              <DialogTitle>{t("index.add-todo")}</DialogTitle>
              <DialogDescription>{t("index.add-todo-p")}</DialogDescription>
            </DialogHeader>
            <div className=" py-4">
              <div className=" items-center ">
                <AddTodo listId={selectedListId ?? 1} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="max-w-xs min-w-full flex justify-center">
        <ListSelector onSelect={handleSelect} />
      </div>

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
