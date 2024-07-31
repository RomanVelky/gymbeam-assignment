import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-service";
import { List } from "@/types/mockapi-types";

export const useGetList = () => {
  return useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const { data } = await api.get<List[]>("/lists");
      return data;
    },
  });
};

//spravit ak zostane cas schemy
