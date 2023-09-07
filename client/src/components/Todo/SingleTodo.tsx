import React, { useState } from "react";
import { Props } from "../../types";
import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";
import { MdDone, MdDoneAll, MdAccessibilityNew } from "react-icons/md";
import "./SingleTodo.css";

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEditTodo = (event: React.FormEvent, id: number) => {
    event.preventDefault();
    setTodos(
      todos.map((el) => (el.id === id ? { ...el, todo: editTodo } : el))
    );
    setEdit(false);
  };

  const handleIsDone = (id: number) => {
    setTodos(
      todos.map((el) => (el.id === id ? { ...el, isDone: !el.isDone } : el))
    );
  };

  // const handleDeleteTodo = (id: number) => {
  //   setTodos(todos.filter((el) => el.id !== id));
  // };

  const handleDeleteTodo = async (id: number): Promise<void> => {
    await fetch("http://localhost:3010/todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setTodos((pre) => pre.filter((el) => el.id !== id));
  };

  return (
    <form
      className="singleTodo"
      onSubmit={(event) => handleEditTodo(event, todo.id)}
    >
      {edit ? (
        <input
          value={editTodo}
          onChange={(event) => setEditTodo(event.target.value)}
          className="singleTodoChange"
        />
      ) : todo.isDone ? (
        <s className="singleTodoText">{todo.todo}</s>
      ) : (
        <span className="singleTodoText">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <RiEdit2Line />
        </span>
        <span className="icon" onClick={() => handleDeleteTodo(todo.id)}>
          <RiDeleteBin2Line />
        </span>
        <span className="icon" onClick={() => handleIsDone(todo.id)}>
          {todo.isDone === null ? (
            <MdAccessibilityNew />
          ) : <MdDone /> || todo.isDone ? (
            <MdDoneAll />
          ) : (
            <MdDone />
          )}
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
