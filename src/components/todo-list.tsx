import { Todo } from "@/types/mockapi-types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { Pen } from "lucide-react";
import { ScrollText } from "lucide-react";

const TodoList = ({
  todos,
  onDeleteTodo,
}: {
  listId: number;
  todos: Todo[];
  onDeleteTodo?: (todoId: number) => void;
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

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Manage TODOS</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <div className="text-center">
                  <Card className="pt-6">
                    <CardContent>{todo.title} card</CardContent>
                  </Card>
                </div>
                <Button onClick={() => handleDeleteTodo(todo.id)}>
                  <Trash />
                </Button>
                <Button>
                  <Pen />
                </Button>
                <Button>
                  <ScrollText />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoList;
