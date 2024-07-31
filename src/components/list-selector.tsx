import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-service";
import { List } from "@/types/mockapi-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

interface ListSelectorProps {
  onSelect: (listId: number) => void;
}

const ListSelector = ({ onSelect }: ListSelectorProps) => {
  const {
    data: lists = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["lists"],
    queryFn: async () => {
      const response = await api.get<List[]>("/lists");
      return response.data;
    },
  });

  const t = useTranslations();

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error fetching lists</p>;

  return (
    <div className="w-full max-w-xs ">
      <Select onValueChange={(value) => onSelect(Number(value))}>
        <SelectTrigger>
          <SelectValue placeholder={t("list-select")} />
        </SelectTrigger>

        <SelectContent className="max-h-[200px]">
          {lists.map((list) => (
            <SelectItem key={list.id} value={list.id.toString()}>
              {list.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ListSelector;
