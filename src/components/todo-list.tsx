import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../lib/api-service";
import { Todo } from "@/types/mockapi-types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TodoList = ({ listId }: { listId: number }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodos();
        const filteredTodos = response.data.filter(
          (todo: Todo) => todo.listId === listId
        );
        setTodos(filteredTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [listId]);

  const handleAddTodo = async () => {
    try {
      const response = await createTodo({
        title: newTodo,
        description: "",
        priority: "",
        dueDate: new Date(),
        tags: [],
        completed: false,
        estimatedTime: 0,
        actualTimeSpent: 0,
        comments: [],
        listId: listId,
      });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleUpdateTodo = async (
    todoId: number,
    updatedData: Partial<Omit<Todo, "listId">>
  ) => {
    try {
      const response = await updateTodo(todoId, updatedData);
      setTodos(
        todos.map((todo) => (todo.id === todoId ? response.data : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      setTodos(todos.filter((todo) => todo.id !== todoId));
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
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
          />
          <Button onClick={handleAddTodo}>Add</Button>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <Input
                  type="text"
                  value={todo.title}
                  placeholder="delete todo"
                  onChange={(e) =>
                    handleUpdateTodo(todo.id, { title: e.target.value })
                  }
                />
                <Button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
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
