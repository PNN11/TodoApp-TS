import { Todo } from "components/TodoItem/TodoItem.types";

export interface FormProps {
  onSubmit: (todo: Todo) => void;
  list: Todo[];
  initial?: Todo | null;
}

export type FormValues = Omit<Todo, "id" | "completed">;
