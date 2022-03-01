import React, { useReducer } from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  Chip,
  ListItemIcon,
  IconButton,
  Tooltip,
  Paper,
  Dialog,
} from "@mui/material";
import { Delete, Edit, Done } from "@mui/icons-material";
import { t } from "i18next";

import Form from "components/Form";
import { TodoItemProps } from "./TodoItem.types";
import { Todo, todoApi } from "store/todos";

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { title, description, priority, dateStart, dateEnd, completed } = todo;
  const [open, toggle] = useReducer((prev) => !prev, false);
  const { data: todoList = [] } = todoApi.useGetAllTodosQuery("");
  const [updateTodo] = todoApi.useUpdateTodoMutation();
  const [deleteTodo] = todoApi.useDeleteTodoMutation();

  const handleEdit = (todo: Todo) => {
    updateTodo(todo);
    toggle();
  };

  const handleDelete = () => {
    deleteTodo(todo);
  };

  const handleDone = () => {
    updateTodo({ ...todo, completed: true });
  };

  return (
    <Paper sx={{ marginBottom: "15px" }} elevation={5}>
      <Dialog open={open} onClose={toggle} fullWidth>
        <Form onSubmit={handleEdit} list={todoList} initial={todo} />
      </Dialog>
      <ListItem>
        <ListItemText
          sx={completed ? { textDecoration: "line-through" } : undefined}
          primary={
            <>
              <Typography variant="h5">{title}</Typography>
              <Typography variant="body2">{description}</Typography>
            </>
          }
          secondary={
            <>
              <Typography variant="overline">
                {t("start")}: {dateStart} {t("end")}: {dateEnd}
              </Typography>
            </>
          }
        />
        <ListItemIcon sx={{ marginRight: "10px" }}>
          <Chip
            color={
              priority === "High"
                ? "success"
                : priority === "Medium"
                ? "warning"
                : "error"
            }
            variant="outlined"
            label={
              <>
                {priority === "High" ? (
                  <>{t("high")}</>
                ) : priority === "Medium" ? (
                  <>{t("medium")}</>
                ) : (
                  <>{t("low")}</>
                )}{" "}
                {t("priority")}
              </>
            }
          />
        </ListItemIcon>
        <>
          {!completed && (
            <>
              <Tooltip title={<>{t("done")}</>}>
                <IconButton onClick={handleDone}>
                  <Done />
                </IconButton>
              </Tooltip>
              <Tooltip title={<>{t("edit")}</>}>
                <IconButton onClick={toggle}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title={<>{t("delete")}</>}>
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Tooltip>
        </>
      </ListItem>
    </Paper>
  );
};

export default TodoItem;
