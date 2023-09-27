import axios from "axios";
import React from "react";
import todoList from '../common/types'


function TodoItem({todoList}:{todoList:todoList}) {
  const deleteTodoHandler = (title:string) => {
    axios
      .delete(`http://127.0.0.1:8000/api/todo/${title}`)
      .then((res) => console.log(res.data));
  };
  return (
    <div>
      <p>
        <span style={{ fontWeight: "bold, underline" }}>
          {todoList.title}:{" "}
        </span>
        {todoList.description}
        <button
          onClick={() => deleteTodoHandler(todoList.title)}
          className="btn btn-outline-danger my-2 mx-2"
          style={{ borderRadius: "50px" }}
        >
          X
        </button>
      </p>
    </div>
  );
}

export default TodoItem