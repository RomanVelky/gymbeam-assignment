import { api } from "@/lib/api-service";
import { List } from "@/types/mockapi-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addList = async (data: Omit<List, "id">): Promise<List> => {
  const response = await api.post<List>("/lists", data);
  return response.data;
};

export const useAddList = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addList,
    onError: (error) => {
      console.error("Error adding list:", error);
    },
    onSuccess: (data) => {
      console.log("List added successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["lists"] });
    },
  });
};

//onSuccess a error dat do indexu
