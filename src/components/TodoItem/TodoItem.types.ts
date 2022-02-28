export interface Todo {
  title: string;
  description: string;
  id: string;
  priority: string;
  completed: boolean;
  dateStart: string;
  dateEnd: string;
}

export interface TodoItemFunc {
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onDone: (todo: Todo) => void;
}

export interface TodoItemProps extends TodoItemFunc {
  todo: Todo;
}
