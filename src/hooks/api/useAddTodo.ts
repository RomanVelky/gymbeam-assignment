import { api } from "@/lib/api-service";
import { Todo } from "@/types/mockapi-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addTodo = async (data: Omit<Todo, "id">): Promise<Todo> => {
  const response = await api.post<Todo>("/todos", data);
  return response.data;
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onError: (error) => {
      console.error("Error adding todo:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
