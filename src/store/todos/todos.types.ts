export interface Todo {
  title: string;
  description: string;
  id: string;
  priority: string;
  completed: boolean;
  dateStart: string;
  dateEnd: string;
}

export interface TodosRequestParams {
  priority?: string;
  status?: string;
  dateStart?: string;
  title?: string;
}
