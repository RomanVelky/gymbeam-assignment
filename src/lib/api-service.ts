import axios from "axios";
import { List, Todo } from "@/types/mockapi-types";
const API_BASE_URL =
  "https://66a82f8c53c13f22a3d20940.mockapi.io/gymbeam-assignment";

const api = axios.create({
  baseURL: API_BASE_URL,
});

//Lists
export const getLists = () => api.get<List[]>("/lists");
export const getList = (id: number) => api.get<List>(`/lists/${id}`);
export const createList = (data: Omit<List, "id">) =>
  api.post<List>("/lists", data);
export const updateList = (id: number, data: Partial<List>) =>
  api.put<List>(`/lists/${id}`, data);
export const deleteList = (id: number) => api.delete<void>(`/lists/${id}`);

//Todos
export const getTodos = () => api.get<Todo[]>(`/todos`);
export const createTodo = (data: Omit<Todo, "id">) =>
  api.post<Todo>(`/todos`, data);
export const updateTodo = (todoId: number, data: Partial<Omit<Todo, "id">>) =>
  api.put<Todo>(`/todos/${todoId}`, data);
export const deleteTodo = (todoId: number) =>
  api.delete<void>(`/todos/${todoId}`);
