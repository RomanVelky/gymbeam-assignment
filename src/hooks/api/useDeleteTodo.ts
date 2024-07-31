import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-service";

const deleteTodo = async (todoId: number): Promise<void> => {
  await api.delete<void>(`/todos/${todoId}`);
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onError: (error) => {
      console.error("Error deleting todo:", error);
    },
    onSuccess: () => {
      console.log("Todo deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
