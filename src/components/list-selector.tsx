import { useLists } from "../contexts/ListContext";
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
  const { lists } = useLists();
  const t = useTranslations();

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
