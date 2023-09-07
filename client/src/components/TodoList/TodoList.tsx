import React, { useEffect } from "react";
import { PropsList } from "../../types";
import SingleTodo from "../Todo/SingleTodo";
import "./TodoList.css";

const TodoList: React.FC<PropsList> = ({ todos, setTodos }) => {
  useEffect((): void => {
    (async function (): Promise<void> {
      const response: Response = await fetch("http://localhost:3010/todo");
      const result = await response.json();
      setTodos((pre) => [...pre, ...result]);
    })();
  }, []);

  return (
    <div className="todos">
      {todos.map((el) => (
        <SingleTodo todo={el} key={el.id} todos={todos} setTodos={setTodos} />
      ))}
    </div>
  );
};

export default TodoList;
