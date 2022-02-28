import React from "react";
import { List, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { TodoListProps } from "./TodoList.types";
import TodoItem from "components/TodoItem";

const TodoList: React.FC<TodoListProps> = ({
  list,
  onEdit,
  onDelete,
  onDone,
}) => {
  const { t } = useTranslation();

  const todoItems = list.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onEdit={onEdit}
      onDelete={onDelete}
      onDone={onDone}
    />
  ));

  return (
    <List>
      {list.length ? (
        todoItems
      ) : (
        <Typography align="center" variant="h4">
          {t("noTasks")}
        </Typography>
      )}
    </List>
  );
};

export default TodoList;
