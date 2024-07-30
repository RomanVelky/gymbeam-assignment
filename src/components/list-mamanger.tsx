import { useEffect, useState } from "react";
import { useLists } from "../contexts/ListContext";
import {
  getLists,
  createList,
  updateList,
  deleteList,
} from "../lib/api-service";
import { List } from "@/types/mockapi-types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ListManager = () => {
  const { lists, fetchLists } = useLists();
  const [newList, setNewList] = useState("");

  const handleAddList = async () => {
    try {
      const response = await createList({ name: newList });
      setNewList("");
      fetchLists();
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  const handleUpdateList = async (
    listId: number,
    updatedData: Partial<List>
  ) => {
    try {
      await updateList(listId, updatedData);
      fetchLists();
    } catch (error) {
      console.error("Error updating list:", error);
    }
  };

  const handleDeleteList = async (listId: number) => {
    try {
      await deleteList(listId);
      fetchLists();
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  };

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Manage LISTS</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            value={newList}
            onChange={(e) => setNewList(e.target.value)}
            placeholder="Add a new list"
          />
          <Button onClick={handleAddList}>Add</Button>
          <ul>
            {lists.map((list) => (
              <li key={list.id}>
                <Input
                  type="text"
                  value={list.name}
                  placeholder="delete todo"
                  onChange={(e) =>
                    handleUpdateList(list.id, { name: e.target.value })
                  }
                />
                <Button onClick={() => handleDeleteList(list.id)}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListManager;
