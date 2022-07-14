import { request } from ".";

const requestCreateTodo = (data) => request("/todo", "POST", data);

const requestUpdateTodo = (todoId, data) =>
  request(`/todo/${todoId}`, "PUT", data);

const requestDeleteTodo = (todoId) => request(`/todo/${todoId}`, "DELETE");

const requestMoveTodo = (data) => request("/todo/move", "POST", data);

export {
  requestCreateTodo,
  requestDeleteTodo,
  requestMoveTodo,
  requestUpdateTodo,
};
