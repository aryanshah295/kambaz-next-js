import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        { 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
        todos.map((todo: any) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </ListGroup><hr/>
</div>);}