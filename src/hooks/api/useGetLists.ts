import { api } from "@/lib/api-service";
import { List } from "@/types/mockapi-types";
import { useQuery } from "@tanstack/react-query";

export const useGetList = () => {
  return useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const { data } = await api.get<List[]>("/lists");
      return data;
    },
  });
};
