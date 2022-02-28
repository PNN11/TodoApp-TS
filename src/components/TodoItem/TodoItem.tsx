import React from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  Chip,
  ListItemIcon,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";

import { TodoItemProps } from "./TodoItem.types";
import { Delete, Edit, Done } from "@mui/icons-material";
import { t } from "i18next";

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEdit,
  onDelete,
  onDone,
}) => {
  const { title, description, priority, dateStart, dateEnd, completed } = todo;

  const handleEdit = () => {
    onEdit(todo);
  };

  const handleDelete = () => {
    onDelete(todo);
  };

  const handleDone = () => {
    onDone(todo);
  };

  return (
    <Paper sx={{ marginBottom: "15px" }} elevation={5}>
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
                <IconButton onClick={handleEdit}>
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
