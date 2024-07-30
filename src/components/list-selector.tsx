import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ListSelector = () => {
  return (
    <div className="w-full max-w-xs">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a todo list" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="0">List 1</SelectItem>
          <SelectItem value="1">List 2</SelectItem>
          <SelectItem value="2">List 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default ListSelector;
