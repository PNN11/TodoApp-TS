import axios from "axios";

import { CreateTodoRequestParams, Todo } from "./todos.types";

export const getTodos = async () => {
  const { data } = await axios.get<Todo[]>("http://localhost:5000/todos");
  return data;
};

export const createTodo = async (body: CreateTodoRequestParams) => {
  const { data } = await axios.post("http://localhost:5000/todos", body);
  return data;
};

export const editTodo = async (id: number, body: CreateTodoRequestParams) => {
  const { data } = await axios.put(`http://localhost:5000/todos/${id}`, body);
  return data;
};

export const deleteTodo = async (id: number) => {
  const { data } = await axios.delete(`http://localhost:5000/todos/${id}`);
  return data;
};
export const deleteCompletedTodos = async () => {
  const { data } = await axios.delete(`http://localhost:5000/todos`);
  return data;
};
