import { useEffect, useState } from "react";
import { getLists } from "../lib/api-service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { List } from "@/types/mockapi-types";
import { useTranslations } from "next-intl";

interface ListSelectorProps {
  onSelect: (listId: number) => void;
}

const ListSelector = ({ onSelect }: ListSelectorProps) => {
  const [lists, setLists] = useState<List[]>([]);
  const t = useTranslations();

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await getLists();
        setLists(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, []);
  return (
    <div className="w-full max-w-xs">
      <Select onValueChange={(value) => onSelect(Number(value))}>
        <SelectTrigger>
          <SelectValue placeholder={t("list-select")} />
        </SelectTrigger>

        <SelectContent>
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
