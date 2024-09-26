export type List = {
  id: number;
  name: string;
};

export type Comment = {
  id: number;
  text: string;
  author: string;
  createdAt: Date;
};

export type Todo = {
  id: number;
  title: string;
  description?: string;
  priority?: string;
  dueDate?: Date;
  tags?: string[];
  completed: boolean;
  estimatedTime?: number;
  actualTimeSpent?: number;
  comments?: Comment[];
  listId: number;
};
