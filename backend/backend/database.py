from model import Todo
import mongita

client = mongita.MongitaClientDisk(host="./db")

database = client.TodoList
collection = database.todo


def fetch_one_todo(title):
    document = collection.find_one({"title": title})
    return document


def fetch_all_todos():
    todos = []
    cursor = collection.find({})
    for document in cursor:
        todos.append(Todo(**document))
    return todos


def create_todo(todo):
    document = todo
    result = collection.insert_one(todo)
    return document


def update_todo(title, desc):
    collection.update_one({"title": title}, {"$set": {"description": desc}})
    document = collection.find_one({"title": title})
    return document


def remove_todo(title):
    collection.delete_one({"title": title})
    return True
