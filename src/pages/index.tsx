import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import TodoList from "@/components/todo-list";
import ListManager from "@/components/list-mamanger";
import { useContext } from "react";
import { LayoutContext } from "@/components/layout/layout";

export default function Home() {
  const t = useTranslations();
  const { selectedListId } = useContext(LayoutContext);
  return (
    <main className="min-h-svh">
      <h1 className="text-center text-7xl">{t("test")}</h1>
      {selectedListId !== null ? (
        <TodoList listId={selectedListId} />
      ) : (
        <p>Please select a list to display todos.</p>
      )}
      <ListManager />
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const messages = (await import(`../messages/${context.locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};
