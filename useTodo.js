import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

//funcion iniciador JSON.parse es el contrario de JSON.stringfy
//Si es nulo entonces inicializa un objeto vacio
const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || initialState;
};

export const useTodo = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  //Manejo del local storage
  useEffect(() => {
    //en el local storage solo se guardan strings
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "[TODO] Add TO DO",
      payload: todo,
    };

    //El dispatch es la funcion que yo uso para mandar la accion
    // recordar que es un elemento del usereducer
    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    const action = {
      type: "[TODO] delete TO DO",
      payload: id,
    };
    dispatch(action);
  };

  const handleToggleTodo = (id) => {
    const action = {
      type: "[TODO] Toggle todo",
      payload: id,
    };
    dispatch(action);
  };

  return {
    todos,
    todosCount: todos.length,
    pendingCount: todos.filter((todo) => todo.done === false).length,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
  };
};
