import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import TodoList from "@/components/todo-list";
import ListManager from "@/components/list-mamanger";
import { useContext, useState, useEffect } from "react";
import { LayoutContext } from "@/components/layout/layout";
import AddTodo from "@/components/add-todo/add-todo";
import { Todo } from "@/types/mockapi-types";
import { getTodos, createTodo, deleteTodo } from "../lib/api-service";

const Home = () => {
  const t = useTranslations();
  const { selectedListId } = useContext(LayoutContext);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (selectedListId !== null) {
      const fetchTodos = async () => {
        try {
          const response = await getTodos();
          const filteredTodos = response.data.filter(
            (todo: Todo) => todo.listId === selectedListId
          );
          setTodos(filteredTodos);
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      };
      fetchTodos();
    }
  }, [selectedListId]);

  const handleAddTodo = async (newTodo: Todo) => {
    try {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <main className="min-h-svh flex flex-col items-center gap-y-8">
      <h1 className="text-center text-7xl">{t("test")}</h1>
      {selectedListId !== null ? (
        <div>
          <TodoList
            listId={selectedListId}
            todos={todos}
            onDeleteTodo={handleDeleteTodo}
          />
          <AddTodo listId={selectedListId} onAdd={handleAddTodo} />
        </div>
      ) : (
        <p>Please select a list to display todos.</p>
      )}
      <ListManager />
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
