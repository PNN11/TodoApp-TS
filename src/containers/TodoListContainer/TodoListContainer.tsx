import React, { useReducer, useState } from "react";
import { CircularProgress, Container, Dialog, Box } from "@mui/material";

import Form from "components/Form";
import TodoList from "containers/TodoList";
import Filter from "components/Filter";
import TodoHeader from "components/TodoHeader";
import { FilterValues } from "components/Filter/Filter.types";
import { Todo, todoApi } from "store/todos";

const TodoListContainer: React.FC = () => {
  const {
    data: todoList = [],
    isLoading,
    isError,
  } = todoApi.useGetAllTodosQuery("");
  const [createTodo] = todoApi.useCreateTodoMutation();

  const [filterValues, setFilterValues] = useState<FilterValues>({
    status: "All",
    priority: "All",
    title: "",
    dateStart: "",
  });
  const [open, toggle] = useReducer((prev) => !prev, false);

  const handleChangeFilterValue = (name: string, value: string) => {
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleCreate = (todo: Todo) => {
    createTodo(todo);
    toggle();
  };

  const handleDeleteAllCompleted = () => {
    // setTodoList(todoList.filter((item) => !item.completed));
  };

  const handleDeleteAll = () => {
    // setTodoList([]);
  };

  const filterList = () => {
    let filteredList = todoList;
    if (filterValues.status === "Completed") {
      filteredList = todoList.filter((item) => item.completed);
    }
    if (filterValues.status === "Active") {
      filteredList = todoList.filter((item) => !item.completed);
    }
    if (filterValues.priority === "High") {
      filteredList = filteredList.filter((item) => item.priority === "High");
    }
    if (filterValues.priority === "Medium") {
      filteredList = filteredList.filter((item) => item.priority === "Medium");
    }
    if (filterValues.priority === "Low") {
      filteredList = filteredList.filter((item) => item.priority === "Low");
    }
    if (filterValues.dateStart) {
      filteredList = filteredList.filter((item) =>
        item.dateStart.includes(filterValues.dateStart)
      );
    }
    if (filterValues.title) {
      return filteredList.filter((item) =>
        item.title.toUpperCase().includes(filterValues.title.toUpperCase())
      );
    }
    return filteredList;
  };

  const list = filterList();

  return (
    <Container>
      <TodoHeader
        open={toggle}
        count={list.length}
        onDeleteCompleted={handleDeleteAllCompleted}
        onDeleteAll={handleDeleteAll}
      />
      <Filter
        filterValues={filterValues}
        onChangeFilterValues={handleChangeFilterValue}
      />
      {isLoading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      {isError && "Some error..."}
      {!isLoading && !isError && todoList && <TodoList list={list} />}
      <Dialog open={open} onClose={toggle} fullWidth>
        <Form onSubmit={handleCreate} list={todoList} />
      </Dialog>
    </Container>
  );
};

export default TodoListContainer;
