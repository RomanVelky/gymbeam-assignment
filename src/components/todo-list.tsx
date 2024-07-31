import { useGetTodos } from "@/hooks/api/useGetTodos";
import { useDeleteTodo } from "@/hooks/api/useDeleteTodo";
import { useUpdateTodo } from "@/hooks/api/useUpdateTodo";
import { Todo } from "@/types/mockapi-types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import EditTodo from "./edit-todo/edit-todo";
import { Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  NotebookText,
  Gauge,
  Tag,
  Clock,
  Check,
  Pen,
  X,
  Trash,
} from "lucide-react";

interface TodoListProps {
  listId: number;
}

const TodoList: React.FC<TodoListProps> = ({ listId }) => {
  const { data: todos = [], isPending, isError } = useGetTodos();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error loading todos.</div>;

  const filteredTodos = todos.filter((todo) => todo.listId === listId);

  const handleDeleteTodo = async (todoId: number) => {
    console.log("Delete todo clicked", todoId);
    try {
      deleteTodo(todoId);
      console.log("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleCompletedChangeClick = (todo: Todo) => {
    console.log("Edit todo clicked", todo);
    const updateArgs = {
      todoId: todo.id,
      data: { completed: !todo.completed },
    };
    try {
      updateTodo(updateArgs);
      console.log("Todo updated successfully");
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
    <div className="w-full">
      {editingTodo ? (
        <EditTodo todo={editingTodo} onCancel={handleCancelEdit} />
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Manage TODOS</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-max w-full">
              {filteredTodos.length > 0 ? (
                filteredTodos.map((todo) => (
                  <li key={todo.id}>
                    <div className="text-center pb-4 h-full">
                      <Card className="pt-6 flex flex-col justify-between h-full">
                        <CardContent className="p-4 space-y-2">
                          <div className="font-bold text-xl">{todo.title}</div>
                          <div className="text-sm flex flex-col">
                            <div className="flex gap-1 justify-center items-center">
                              <NotebookText />
                              <strong>Description:</strong>
                            </div>
                            {todo.description || "No description provided"}
                          </div>
                          <div
                            className={`text-sm ${
                              todo.completed ? "text-green-500" : "text-red-500"
                            }`}>
                            {todo.completed ? (
                              <div className="text-sm flex gap-1 items-center justify-center">
                                <Check /> <span>Completed</span>
                              </div>
                            ) : (
                              <div className="text-sm flex gap-1 items-center justify-center">
                                <X /> <span>Incompleted</span>
                              </div>
                            )}
                          </div>
                          <div className="text-sm flex gap-1 items-center justify-center">
                            <Gauge />
                            <strong>Priority:</strong> {todo.priority || "N/A"}
                          </div>
                          <div className="text-sm flex gap-1 justify-center items-center">
                            <Tag /> <strong>Tags:</strong>
                            {todo.tags && todo.tags.length > 0 ? (
                              <div className="flex flex-wrap gap-2 mt-1 justify-center">
                                {todo.tags.map((tag, index) => (
                                  <Badge key={index}>{tag}</Badge>
                                ))}
                              </div>
                            ) : (
                              "None"
                            )}
                          </div>
                          <div className="text-sm flex gap-1 justify-center items-center">
                            <Clock />
                            <strong>Estimated/Actual time:</strong>
                            {todo.estimatedTime}/{todo.actualTimeSpent} h
                          </div>
                          <div className="text-sm flex gap-1 justify-center items-center">
                            <Calendar />
                            <strong>Due Date:</strong>
                            {todo.dueDate
                              ? typeof todo.dueDate === "string"
                                ? new Date(todo.dueDate).toLocaleDateString()
                                : todo.dueDate instanceof Date
                                ? todo.dueDate.toLocaleDateString()
                                : "No date"
                              : "No date"}
                          </div>
                          <div className="flex justify-center align-end">
                            <div>
                              <div className="py-2 px-4">
                                <Button
                                  onClick={() =>
                                    handleCompletedChangeClick(todo)
                                  }>
                                  {todo.completed ? (
                                    <div className="flex gap-1 justify-center items-center">
                                      <X />
                                      <span>Mark Incomplete</span>
                                    </div>
                                  ) : (
                                    <div className="flex gap-1 justify-center items-center">
                                      <Check />
                                      <span>Mark Complete</span>
                                    </div>
                                  )}
                                </Button>
                              </div>
                              <div className="px-4 flex gap-2">
                                <Button
                                  className="w-1/2"
                                  onClick={() => handleEditClick(todo)}>
                                  <Pen />
                                </Button>
                                <Button
                                  className="w-1/2"
                                  onClick={() => handleDeleteTodo(todo.id)}>
                                  <Trash />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </li>
                ))
              ) : (
                <div>No todos available for this list.</div>
              )}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TodoList;
