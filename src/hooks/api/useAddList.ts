import { api } from "@/lib/api-service";
import { List } from "@/types/mockapi-types";
import { useMutation } from "@tanstack/react-query";

const addList = async (data: Partial<List>): Promise<List> => {
  const response = await api.post<List>("/lists", data);
  return response.data;
};

export const useAddList = () => {
  return useMutation({
    mutationFn: addList,
  });
};
