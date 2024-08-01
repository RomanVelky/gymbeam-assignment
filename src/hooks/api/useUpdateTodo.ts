import { api } from "@/lib/api-service";
import { Todo } from "@/types/mockapi-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateTodoArgs {
  todoId: number;
  data: Partial<Omit<Todo, "id">>;
}

const updateTodo = async ({ todoId, data }: UpdateTodoArgs): Promise<Todo> => {
  const response = await api.put<Todo>(`/todos/${todoId}`, data);
  return response.data;
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onError: (error: Error) => {
      console.error("Error updating todo:", error.message);
    },
    onSuccess: (data) => {
      console.log("Todo updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
