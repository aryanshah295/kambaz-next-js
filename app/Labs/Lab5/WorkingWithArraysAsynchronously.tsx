"use client";
import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaTrash , FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
import { FormControl } from "react-bootstrap";
import * as client from "./client";
export default function WorkingWithArraysAsynchronously() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editTodo = (todo: any) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, editing: true } : t
    );
    setTodos(updatedTodos);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };
  const createNewTodo = async () => {
    const todos = await client.createNewTodo();
    setTodos(todos);
  };
  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos([...todos, newTodo]);  // Append to existing array
  };
  const fetchTodos = async () => {
    const todos = await client.fetchTodos();
    setTodos(todos);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeTodo = async (todo: any) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response.data.message);
    }
    
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}
      <h4>Todos <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          style={{ cursor: "pointer" }}
          id="wd-create-todo"
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          style={{ cursor: "pointer" }}
          id="wd-post-todo"
        />
        <button
          onClick={() => deleteTodo({ id: 1234, title: "Test", completed: false })}
          className="btn btn-danger btn-sm float-end me-2"
          id="wd-test-delete-error"
        >
          Test Delete Error (ID: 1234)
        </button>
        </h4>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end me-2 mt-1"
              style={{ cursor: "pointer" }}
              id="wd-remove-todo"
            />
            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3"
              id="wd-delete-todo"
            />
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1"
              style={{ cursor: "pointer" }}
            />
            <input type="checkbox" defaultChecked={todo.completed} className="form-check-input me-2 float-start"
              onChange={(e) => updateTodo({ ...todo, completed: e.target.checked }) } />
              {!todo.editing ? ( todo.title ) : (
                <FormControl className="w-50 float-start" defaultValue={todo.title}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTodo({ ...todo, editing: false });
                    }
                  }}
                  onChange={(e) =>
                    updateTodo({ ...todo, title: e.target.value })
                  }
                />
              )}
          </ListGroupItem>
        ))}
      </ListGroup> <hr />
    </div>
);}