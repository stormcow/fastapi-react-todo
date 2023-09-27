from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model import Todo

from database import (
    fetch_one_todo,
    fetch_all_todos,
    create_todo,
    update_todo,
    remove_todo,
)

app = FastAPI()

origins = ["http://127.0.0.1:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/todo")
def get_todo():
    response = fetch_all_todos()
    return response


@app.get("/api/todo/{title}", response_model=Todo)
def get_todo_by_title(title):
    response = fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, detail="no todo with this title")


@app.post("/api/todo", response_model=Todo)
def post_todo(todo: Todo):
    response = create_todo(todo.model_dump())
    if response:
        return response
    raise HTTPException(400, detail="Something went wrong")


@app.put("/api/todo/{title}", response_model=Todo)
def put_todo(title: str, desc: str):
    response = update_todo(title, desc)
    if response:
        return response
    raise HTTPException(404, detail="no todo with this title")


@app.delete("/api/todo/{title}")
def delete_todo(title):
    response = remove_todo(title)
    if response:
        return "Deleted {title}"
    raise HTTPException(404, "no todo with title: {titledefault = None}")
