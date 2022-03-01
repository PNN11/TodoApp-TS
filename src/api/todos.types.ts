export interface Todo {
  title: string;
  description: string;
  id: string;
  priority: string;
  completed: boolean;
  dateStart: string;
  dateEnd: string;
}

export type CreateTodoRequestParams = Omit<Todo, "id">;

export interface TodosRequestParams {
  priority?: string;
  status?: string;
  dateStart?: string;
  title?: string;
}
