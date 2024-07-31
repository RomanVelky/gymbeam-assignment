import { Todo } from "@/types/mockapi-types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { Pen } from "lucide-react";
import { ScrollText } from "lucide-react";

interface TodoListProps {
  listId: number;
  todos: Todo[]; // This should be an array of Todo
  onDeleteTodo?: (todoId: number) => void;
  onEditTodo?: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDeleteTodo,
  onEditTodo,
}) => {
  const handleDeleteTodo = async (todoId: number) => {
    try {
      if (onDeleteTodo) {
        onDeleteTodo(todoId);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditClick = (todo: Todo) => {
    console.log("click trigered");
    if (onEditTodo) {
      console.log("on edit happend with", todo);
      onEditTodo(todo);
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
            {todos.map((todo) => (
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
                      <div className="justify-between flex py-2 px-4">
                        <Button>
                          <ScrollText />
                        </Button>
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
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoList;
