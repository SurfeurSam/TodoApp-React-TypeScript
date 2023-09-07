import React from "react";
import "./Input.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleTodo: (event: React.FormEvent) => void;
}

const Input: React.FC<Props> = ({ todo, setTodo, handleTodo }) => {
  return (
    <form
      className="inputTodo"
      onSubmit={
        handleTodo
      }
    >
      <input
        name="todo"
        type="input"
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
        className="inputTask"
        placeholder="Enter your task"
      />
      <button className="inputSubmit" type="submit">
        Go
      </button>
    </form>
  );
};

export default Input;
