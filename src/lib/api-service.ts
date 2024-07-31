import axios, { AxiosResponse } from "axios";
import { List, Todo } from "@/types/mockapi-types";

// Ensure axios has the correct base URL for API routes
export const api = axios.create({
  baseURL: "https://66a82f8c53c13f22a3d20940.mockapi.io/gymbeam-assignment/",
});

export const getList = (id: number) => api.get<List>(`/lists/${id}`);

export const updateList = (id: number, data: Partial<List>) =>
  api.put<List>(`/lists/${id}`, data);
export const deleteList = (id: number) => api.delete<void>(`/lists/${id}`);

//export const getTodos = () => axios.get<Todo[]>("/api/todos")=>

export const getTodos = async (): Promise<Todo[]> => {
  const response = await api.get<Todo[]>(`/todos`);
  return response.data; // Ensure it returns the array of Todo
};

export const createTodo = async (data: Omit<Todo, "id">): Promise<Todo> => {
  const response: AxiosResponse<Todo> = await api.post("/todos", data);
  return response.data;
};
export const updateTodo = (todoId: number, data: Partial<Omit<Todo, "id">>) =>
  api.put<Todo>(`/api/todos/${todoId}`, data);
export const deleteTodo = (todoId: number) =>
  api.delete<void>(`/api/todos/${todoId}`);
