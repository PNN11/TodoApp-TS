import React, { useMemo } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { FormProps, FormValues } from "./Form.types";
import { getEndDate, getStartDate } from "./helpers/date";

const Form: React.FC<FormProps> = ({ onSubmit, list, initial }) => {
  const titleList = useMemo(
    () =>
      list.map((todo) => (todo.title === initial?.title ? null : todo.title)),
    [list, initial]
  );

  const { t } = useTranslation();

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    handleReset,
  } = useFormik<FormValues>({
    initialValues: initial || {
      title: "",
      description: "",
      priority: "Medium",
      dateStart: getStartDate(),
      dateEnd: getEndDate(),
    },
    validationSchema: yup.object().shape({
      title: yup.string().required().min(4).max(25).notOneOf(titleList),
      description: yup.string().max(75),
    }),
    onSubmit: (values) => {
      onSubmit({
        ...values,
        id: initial?.id ?? uuidv4(),
        completed: false,
      });
    },
  });

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <DialogTitle>{t("createNewTodo")}</DialogTitle>
      <DialogContent>
        <Stack direction="column" mt={2} spacing={2}>
          <TextField
            id="title"
            name="title"
            label={t("title")}
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && !!errors.title}
            helperText={touched.title && errors.title}
          />
          <TextField
            id="description"
            name="description"
            label={t("description")}
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.description && !!errors.description}
            helperText={touched.description && errors.description}
          />
          <FormControl>
            <InputLabel id="priority">{t("priority")}</InputLabel>
            <Select
              labelId="priority"
              name="priority"
              id="priority"
              value={values.priority}
              label={t("priority")}
              onChange={handleChange}
            >
              <MenuItem value="High">{t("high")}</MenuItem>
              <MenuItem value="Medium">{t("medium")}</MenuItem>
              <MenuItem value="Low">{t("low")}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="dateStart"
            name="dateStart"
            label={t("dateStart")}
            value={values.dateStart}
            onChange={handleChange}
            type="datetime-local"
          />
          <TextField
            id="dateEnd"
            name="dateEnd"
            label={t("dateEnd")}
            value={values.dateEnd}
            onChange={handleChange}
            type="datetime-local"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="reset">
          {t("reset")}
        </Button>
        {initial ? (
          <Button variant="contained" type="submit">
            {t("edit")}
          </Button>
        ) : (
          <Button variant="contained" type="submit">
            {t("create")}
          </Button>
        )}
      </DialogActions>
    </form>
  );
};

export default Form;
