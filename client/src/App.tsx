import React, { useState } from "react";
import "./App.css";
import Input from "./components/Input/Input";
import { Todo } from "./types";
import TodoList from "./components/TodoList/TodoList";


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");

  
  const [todos, setTodos] = useState<Todo[]>([]);
 
  // const handleTodo = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (todo) {
  //     setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
  //     setTodo('')
  //   }
  // };

  const handleTodo = async (event: React.FormEvent) => {
    event.preventDefault();
      const response: Response = await fetch('http://localhost:3010/todo', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({todo, isDone: true})
    })
      console.log("🚀🚀🚀🚀🚀 ~ response:", response)
    
    const result = await response.json()
    console.log("🚀🚀🚀🚀🚀 ~ result:", result)
    
    setTodos((pre) => {
      return ([...pre, result ])
    })
    setTodo('')
   };

  return (
    <div className="App">
      <span className="header">My ToDo app</span>
      <Input todo={todo} setTodo={setTodo} handleTodo={handleTodo} /><br />
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
