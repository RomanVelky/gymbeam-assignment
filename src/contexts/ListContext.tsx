import { List } from "@/types/mockapi-types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getLists } from "../lib/api-service";

interface ListsProviderProps {
  children: ReactNode;
}

interface ListsContextType {
  lists: List[];
  fetchLists: () => void;
}

const ListsContext = createContext<ListsContextType>({
  lists: [],
  fetchLists: () => {},
});

export const ListsProvider = ({ children }: ListsProviderProps) => {
  const [lists, setLists] = useState<List[]>([]);

  const fetchLists = useCallback(async () => {
    console.log("Fetching lists");
    try {
      const response = await getLists();
      setLists(response.data);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  }, []);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  return (
    <ListsContext.Provider value={{ lists, fetchLists }}>
      {children}
    </ListsContext.Provider>
  );
};

export const useLists = () => useContext(ListsContext);
