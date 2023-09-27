import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import TodoView from "./components/TodoListView";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/todo").then((res) => {
      setTodoList(res.data);
      console.log(res.data);
    });
  });

  const addTodoHandler = () => {
    axios
      .post("http://127.0.0.1:8000/api/todo", {
        title: title,
        description: desc,
      })
      .then(
        () => setTitle("")
      )
  };

  return (
    <div
      className="App list-group-item justify-content-center align-items-center mx-auto"
      style={{ width: "400px", backgroundColor: "white", marginTop: "15px" }}
    >
      <h1 className="card text-white bg-primary mb-1">Task Manager</h1>
      <h6 className="card text-white bg-primary mb-3">
        FASTAPI - React - MongoDB
      </h6>
      <div
        className="card-body"
        style={{ marginLeft: "10px", marginRight: "10px" }}
      >
        <h5 className="card text-white bg-dark mb-3">Add Your Task</h5>
        <span className="card-text">
          <input
            className="mb-2 form-control titleIn"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          ></input>
          <input
            className="mb-2 form-control descIn"
            value={desc}
            placeholder="Description"
            onChange={(event) => setDesc(event.target.value)}
          ></input>
          <button
            className="btn btn-outline-primary mx-2 mb-2"
            style={{ borderRadius: "50px", fontWeight: "bold" }}
            onClick={addTodoHandler}
          >
            Add Task
          </button>
        </span>
        <h5 className="card text-white bg-dark mb-3">Your Tasks</h5>
        <div>
          <TodoView todoArray={todoList} />
        </div>
      </div>
    </div>
  );
}

export default App;
