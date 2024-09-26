import { Card, CardContent } from "@/components/ui/card";
import { useDeleteTodo } from "@/hooks/api/useDeleteTodo";
import { useGetTodos } from "@/hooks/api/useGetTodos";
import { useUpdateTodo } from "@/hooks/api/useUpdateTodo";
import { Todo } from "@/types/mockapi-types";
import {
  Calendar,
  Check,
  Clock,
  Gauge,
  NotebookText,
  Pen,
  Tag,
  Trash,
  X,
} from "lucide-react";
import { useState } from "react";
import EditTodo from "./edit-todo/edit-todo";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useTranslations } from "next-intl";
import useDateFormatter from "@/hooks/useDateFormatter";

type TodoListProps = {
  listId: number;
};

const TodoList: React.FC<TodoListProps> = ({ listId }) => {
  const { data: todos = [], isPending, isError } = useGetTodos();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();
  const t = useTranslations();
  const { formatDate } = useDateFormatter();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  if (isPending) return <div>{t("global.loading")}</div>;
  if (isError) return <div>{t("global.error")}</div>;

  const filteredTodos = todos.filter((todo) => todo.listId === listId);

  const handleDeleteTodo = async (todoId: number) => {
    try {
      deleteTodo(todoId);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleCompletedChangeClick = (todo: Todo) => {
    const updateArgs = {
      todoId: todo.id,
      data: { completed: !todo.completed },
    };
    try {
      updateTodo(updateArgs);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="w-full text-center">
      {editingTodo ? (
        <Dialog open={true} onOpenChange={handleCancelEdit}>
          <DialogContent className="max-w-[300px] sm:max-w-[300px] lg:max-w-[450px] max-h-screen lg:max-h-fit overflow-auto rounded-lg">
            <DialogHeader>
              <DialogTitle>{t("todo-list.edit")}</DialogTitle>
              <DialogDescription>{t("todo-list.edit-p")}</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="items-center">
                <EditTodo todo={editingTodo} onCancel={handleCancelEdit} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          {filteredTodos.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-max w-full">
              {filteredTodos.map((todo) => (
                <li key={todo.id}>
                  <div className="text-center pb-4 h-full">
                    <Card className="pt-6 flex flex-col justify-between h-full">
                      <CardContent className="p-4 space-y-2">
                        <div className="font-bold text-xl">{todo.title}</div>
                        <div className="text-sm flex flex-col">
                          <div className="flex gap-1 justify-center items-center">
                            <NotebookText />
                            <strong>{t("todo-list.desc")}</strong>
                          </div>
                          {todo.description || t("todo-list.no-desc")}
                        </div>
                        <div
                          className={`text-sm ${
                            todo.completed ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {todo.completed ? (
                            <div className="text-sm flex gap-1 items-center justify-center">
                              <Check />
                              <span>{t("todo-list.completed")}</span>
                            </div>
                          ) : (
                            <div className="text-sm flex gap-1 items-center justify-center">
                              <X /> <span>{t("todo-list.incompleted")}</span>
                            </div>
                          )}
                        </div>
                        <div className="text-sm flex gap-1 items-center justify-center">
                          <Gauge />
                          <strong>{t("todo-list.prio")}</strong>{" "}
                          {todo.priority || "N/A"}
                        </div>
                        <div className="text-sm flex gap-1 justify-center items-center">
                          <Tag /> <strong>{t("todo-list.tags")}</strong>
                          {todo.tags && todo.tags.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mt-1 justify-center">
                              {todo.tags.map((tag, index) => (
                                <Badge key={index}>{tag}</Badge>
                              ))}
                            </div>
                          ) : (
                            t("todo-list.none")
                          )}
                        </div>
                        <div className="text-sm flex gap-1 justify-center items-center">
                          <Clock />
                          <strong>{t("todo-list.time")}</strong>
                          {todo.estimatedTime}/{todo.actualTimeSpent} h
                        </div>
                        <div className="text-sm flex gap-1 justify-center items-center">
                          <Calendar />
                          <strong>{t("todo-list.date")}</strong>
                          <strong>{t("todo-list.date")}</strong>
                          {todo.dueDate
                            ? formatDate(todo.dueDate)
                            : t("todo-list.no-date")}
                        </div>
                        <div className="flex justify-center align-end">
                          <div>
                            <div className="py-2 px-4">
                              <Button
                                onClick={() => handleCompletedChangeClick(todo)}
                              >
                                {todo.completed ? (
                                  <div className="flex gap-1 justify-center items-center">
                                    <X />
                                    <span>{t("todo-list.mark-in")}</span>
                                  </div>
                                ) : (
                                  <div className="flex gap-1 justify-center items-center">
                                    <Check />
                                    <span>{t("todo-list.mark-com")}</span>
                                  </div>
                                )}
                              </Button>
                            </div>
                            <div className="px-4 flex gap-2">
                              <Button
                                className="w-1/2"
                                onClick={() => handleEditClick(todo)}
                              >
                                <Pen />
                              </Button>
                              <Button
                                className="w-1/2"
                                onClick={() => handleDeleteTodo(todo.id)}
                              >
                                <Trash />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-screen w-full">
              {t("todo-list.no-todos")}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;
