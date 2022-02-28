import React from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { TodoHeaderProps } from "./TodoHeader.types";

const TodoHeader: React.FC<TodoHeaderProps> = ({
  open,
  count,
  onDeleteCompleted,
  onDeleteAll,
}) => {
  const { t } = useTranslation();

  return (
    <Paper elevation={0}>
      <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
        <Typography variant="h4">
          {t("numberTask")}: {count}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={open}>
            {t("addTask")}
          </Button>
          <Button color="error" variant="outlined" onClick={onDeleteCompleted}>
            {t("deleteCompleted")}
          </Button>
          <Button color="error" variant="outlined" onClick={onDeleteAll}>
            {t("deleteAll")}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default TodoHeader;
