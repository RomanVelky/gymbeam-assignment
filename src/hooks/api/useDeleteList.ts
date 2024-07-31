import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-service";
import { List } from "@/types/mockapi-types";

const deleteList = async (id: number): Promise<void> => {
  await api.delete(`/lists/${id}`);
};

export const useDeleteList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteList,
    onError: (error) => {
      console.error("Error deleting list:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
};
