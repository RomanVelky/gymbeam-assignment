import { api } from "@/lib/api-service";
import { Todo } from "@/types/mockapi-types";
import { useQuery } from "@tanstack/react-query";

const getTodoById = async (todoId: number): Promise<Todo> => {
  const response = await api.get<Todo>(`/todos/${todoId}`);
  return response.data;
};

export const useGetTodoById = (todoId: number) => {
  return useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => getTodoById(todoId),
    enabled: !!todoId,
  });
};
