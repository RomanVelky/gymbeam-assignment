import { useGetTodos } from "@/hooks/api/useGetTodos";
import { useDeleteTodo } from "@/hooks/api/useDeleteTodo";
import { useUpdateTodo } from "@/hooks/api/useUpdateTodo";
import { Todo } from "@/types/mockapi-types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { Pen } from "lucide-react";
import { ScrollText } from "lucide-react";

interface TodoListProps {
  listId: number;
}

const TodoList: React.FC<TodoListProps> = ({ listId }) => {
  const { data: todos = [], isPending, isError } = useGetTodos();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

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

  const handleEditClick = (todo: Todo) => {
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

  return (
    <div>
      <Card className="sm:max-w-[250px] lg:max-w-[400px]">
        <CardHeader>
          <CardTitle>Manage TODOS</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <li key={todo.id}>
                  <div className="text-center pb-4">
                    <Card className="pt-6">
                      <CardContent className="p-4 space-y-2">
                        <div className="font-bold text-xl">{todo.title}</div>
                        <div className="text-sm flex flex-col">
                          <strong>Description:</strong>{" "}
                          {todo.description || "No description provided"}
                        </div>
                        <div
                          className={`text-sm ${
                            todo.completed ? "text-green-500" : "text-red-500"
                          }`}>
                          {todo.completed ? "Completed" : "Not Completed"}
                        </div>
                        <div className="text-sm ">
                          <strong>Priority:</strong> {todo.priority || "N/A"}
                        </div>
                        <div className="text-sm ">
                          <strong>Tags:</strong>{" "}
                          {todo.tags && todo.tags.length > 0
                            ? todo.tags.join(", ")
                            : "None"}
                        </div>
                        <div className="text-sm">
                          <strong>Estimated Time:</strong> {todo.estimatedTime}{" "}
                          hours
                        </div>
                        <div className="text-sm ">
                          <strong>Actual Time Spent:</strong>{" "}
                          {todo.actualTimeSpent} hours
                        </div>
                        <div className="text-sm">
                          <strong>Due Date:</strong>
                          {todo.dueDate
                            ? typeof todo.dueDate === "string"
                              ? new Date(todo.dueDate).toLocaleDateString()
                              : todo.dueDate instanceof Date
                              ? todo.dueDate.toLocaleDateString()
                              : "No date"
                            : "No date"}
                        </div>
                        <div className="justify-between flex py-2 px-4 ">
                          <Button onClick={() => handleEditClick(todo)}>
                            <Pen />
                          </Button>
                          <Button onClick={() => handleDeleteTodo(todo.id)}>
                            <Trash />
                          </Button>
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
    </div>
  );
};

export default TodoList;
