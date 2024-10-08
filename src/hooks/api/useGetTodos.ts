import { api } from "@/lib/api-service";
import { Todo } from "@/types/mockapi-types";
import { useQuery } from "@tanstack/react-query";

const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get<Todo[]>(`/todos`);
  return response.data;
};

export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};
