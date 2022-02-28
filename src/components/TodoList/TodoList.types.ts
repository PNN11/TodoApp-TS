import { Todo, TodoItemFunc } from "components/TodoItem/TodoItem.types";

export interface TodoListProps extends TodoItemFunc {
  list: Todo[];
}
