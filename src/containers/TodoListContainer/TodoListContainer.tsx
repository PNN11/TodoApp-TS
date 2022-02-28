import React, { useEffect, useReducer, useState } from "react";
import { Container, Dialog } from "@mui/material";

import Form from "components/Form";
import TodoList from "components/TodoList";
import Filter from "components/Filter";
import TodoHeader from "components/TodoHeader";
import { FilterValues } from "components/Filter/Filter.types";
import { Todo } from "components/TodoItem/TodoItem.types";
import {
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "helpers/localStorage";

const TodoListContainer: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>(
    getItemFromLocalStorage("todoList") || []
  );
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    status: "All",
    priority: "All",
    title: "",
    date: "",
  });
  const [open, toggle] = useReducer((prev) => !prev, false);

  const handleChangeFilterValue = (name: string, value: string) => {
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleSubmit = (todo: Todo) => {
    if (editTodo) {
      setTodoList(
        todoList.map((item) =>
          item.id === todo.id ? { ...item, ...todo } : item
        )
      );
    } else {
      setTodoList([...todoList, todo]);
    }
    setEditTodo(null);
    toggle();
  };

  const handleEdit = (todo: Todo) => {
    setEditTodo(todo);
    toggle();
  };

  const handleDelete = (todo: Todo) => {
    setTodoList(todoList.filter((item) => item.id !== todo.id));
  };

  const handleDeleteAllCompleted = () => {
    setTodoList(todoList.filter((item) => !item.completed));
  };

  const handleDeleteAll = () => {
    setTodoList([]);
  };

  const handleDone = (todo: Todo) => {
    setTodoList(
      todoList.map((item) =>
        item.id === todo.id ? { ...item, completed: true } : item
      )
    );
  };

  useEffect(() => {
    setItemToLocalStorage("todoList", todoList);
  }, [todoList]);

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
    if (filterValues.date) {
      filteredList = filteredList.filter((item) =>
        item.dateStart.includes(filterValues.date)
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
      <TodoList
        list={list}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDone={handleDone}
      />
      <Dialog open={open} onClose={toggle} fullWidth>
        <Form onSubmit={handleSubmit} list={todoList} initial={editTodo} />
      </Dialog>
    </Container>
  );
};

export default TodoListContainer;
