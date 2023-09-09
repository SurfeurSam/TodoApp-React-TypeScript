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

  // const handleIsDone = (id: number) => {
  //   setTodos(
  //     todos.map((el) => (el.id === id ? { ...el, isDone: !el.isDone } : el))
  //   );
  // };

  const handleIsDone = async (id: number, isDone: boolean): Promise<void> => {
    console.log("ЕСТЬ НАЖАТИЕ!");
    await fetch("http://localhost:3010/todo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, isDone }),
    });
    setTodos(
          todos.map((el) => (el.id === id ? { ...el, isDone: !el.isDone } : el))
        );    
  }

  // inputs.forEach((el) => {
  //   el.addEventListener('change', async (e) => {
  //     e.preventDefault();
  //     const data = { value: e.target.checked, name: e.target.name }
  //     console.log("🚀🚀🚀🚀🚀 ~ data:", data)
    
  //     const { formid } = editForm.dataset;
  //     console.log("🚀🚀🚀🚀🚀 ~ formid:", formid)
  //     try {
  //       await fetch(`/profile/edit.shablon/${formid}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(data),
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   });
  // });

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
        <span className="icon" onClick={() => handleIsDone(todo.id, todo.isDone)}>
          {todo.isDone ? <MdDoneAll /> : <MdDone />}
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
