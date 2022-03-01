import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { FilterProps } from "./Filter.types";

const Filter: React.FC<FilterProps> = ({
  filterValues,
  onChangeFilterValues,
}) => {
  const { status, title, priority, dateStart } = filterValues;

  const { t } = useTranslation();

  const handleChangeStatus = (e: SelectChangeEvent) => {
    onChangeFilterValues("status", e.target.value);
  };
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFilterValues("title", e.target.value);
  };
  const handleChangePriority = (e: SelectChangeEvent) => {
    onChangeFilterValues("priority", e.target.value);
  };
  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFilterValues("dateStart", e.target.value);
  };

  return (
    <Paper elevation={5}>
      <Stack
        direction="row"
        justifyContent="space-between"
        flexWrap="wrap"
        m={2}
        p={2}
        alignItems="baseline"
      >
        <TextField
          sx={{ width: "20%", minWidth: "150px" }}
          variant="standard"
          id="title"
          name="title"
          label={t("filterByTitle")}
          value={title}
          onChange={handleChangeTitle}
        />
        <FormControl
          variant="standard"
          sx={{ width: "20%", minWidth: "150px" }}
        >
          <InputLabel id="status">{t("filterByStatus")}</InputLabel>
          <Select
            labelId="status"
            id="status"
            label={t("filterByStatus")}
            name="status"
            value={status}
            onChange={handleChangeStatus}
          >
            <MenuItem value="All">{t("all")}</MenuItem>
            <MenuItem value="Completed">{t("completed")}</MenuItem>
            <MenuItem value="Active">{t("active")}</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="standard"
          sx={{ width: "20%", minWidth: "150px" }}
        >
          <InputLabel id="priority">{t("filterByPriority")}</InputLabel>
          <Select
            labelId="priority"
            id="priority"
            label={t("filterByPriority")}
            name="priority"
            value={priority}
            onChange={handleChangePriority}
          >
            <MenuItem value="All">{t("all")}</MenuItem>
            <MenuItem value="High">{t("high")}</MenuItem>
            <MenuItem value="Medium">{t("medium")}</MenuItem>
            <MenuItem value="Low">{t("low")}</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ width: "20%", minWidth: "150px" }}
          type="date"
          variant="standard"
          name="date"
          value={dateStart}
          onChange={handleChangeDate}
        />
      </Stack>
    </Paper>
  );
};

export default Filter;
