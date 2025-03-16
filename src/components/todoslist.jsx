import { useSelector, useDispatch } from "react-redux";
import { toggleComplete, removeTodo } from "../features/todoSlice";
import { Delete } from "../icons/dustbin";

const TodoList = () => {
  const { todos, filter, searchQuery } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const filteredTodosh = todos.filter((todo) => {
    if (!filter.toLowerCase().includes("all")) {
      if (filter.toLowerCase().includes("completed") && !todo.completed) return false;
      if (filter.toLowerCase().includes("incomplete") && todo.completed) return false;
      const selectedFilters = filter.toLowerCase().split(" "); // Convert filter string to an array
      if (!selectedFilters.includes(todo.category.toLowerCase())) return false;
    }
    if (todo.priority !== "H") {
      return false;
    }
    return todo.task.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredTodosm = todos.filter((todo) => {
    if (!filter.toLowerCase().includes("all")) {
      if (filter.toLowerCase().includes("completed") && !todo.completed) return false;
      if (filter.toLowerCase().includes("incomplete") && todo.completed) return false;
      const selectedFilters = filter.toLowerCase().split(" "); // Convert filter string to an array
      if (!selectedFilters.includes(todo.category.toLowerCase())) return false;
    }
    if (todo.priority !== "M") {
      return false;
    }
    return todo.task.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredTodosl = todos.filter((todo) => {
    if (!filter.toLowerCase().includes("all")) {
      if (filter.toLowerCase().includes("completed") && !todo.completed) return false;
      if (filter.toLowerCase().includes("incomplete") && todo.completed) return false;
      const selectedFilters = filter.toLowerCase().split(" "); // Convert filter string to an array
      if (!selectedFilters.includes(todo.category.toLowerCase())) return false;
    }
    if (todo.priority !== "L") {
      return false;
    }
    return todo.task.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="p-4">
      <div className="grid grid-cols-[2.7fr_0.9fr_1fr] gap-2 mb-1 text-gray-500 font-bold">
        <div className="font text-lg ">High Priority</div>
        <div className="font text-lg text-left">Date</div>
        <div className="font text-lg">Category</div>
      </div>
      {filteredTodosh.map((todo) => (
        <div
          key={todo.id}
          className={`grid grid-cols-[0.2fr_2.8fr_1fr_1fr_auto] gap-2 mb-1 items-center`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleComplete(todo.id))}
            className="rounded w-8 h-8 justify-self-center ml-4"
          />

          <span
            className="font-bold text-lg rounded p-2 bg-red-300"
          >
            {todo.task}
          </span>
          <span
            className="p-2 rounded font-bold text-lg bg-red-300"
          >
            {todo.dueDate}
          </span>
          <span
            className="rounded font-bold text-lg p-2 bg-red-300"
          >
            {todo.category}
          </span>

          <button
            onClick={() => dispatch(removeTodo(todo.id))}
            className="bg-gray-300 text-gray-950 p-2 rounded cursor-pointer h-full"
          >
            <Delete />
          </button>
        </div>
      ))}
      <h3 className="font-bold text-lg  text-gray-500">Medium Priority</h3>
      {filteredTodosm.map((todo) => (
        <div
          key={todo.id}
          className={`grid grid-cols-[0.2fr_2.8fr_1fr_1fr_auto] gap-2 mb-1 items-center`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleComplete(todo.id))}
            className="rounded w-8 h-8 justify-self-center ml-4"
          />

          <span
            className="font-bold text-lg rounded p-2 bg-yellow-200"
          >
            {todo.task}
          </span>
          <span
            className="p-2 rounded font-bold text-lg bg-yellow-200"
          >
            {todo.dueDate}
          </span>
          <span
            className="rounded font-bold text-lg p-2 bg-yellow-200"
          >
            {todo.category}
          </span>

          <button
            onClick={() => dispatch(removeTodo(todo.id))}
            className="bg-gray-300 text-gray-950 p-2 rounded cursor-pointer h-full"
          >
            <Delete />
          </button>
        </div>
      ))}
      <h3 className="font-bold text-lg  text-gray-500">Low Priority</h3>
      {filteredTodosl.map((todo) => (
        <div
          key={todo.id}
          className={`grid grid-cols-[0.2fr_2.8fr_1fr_1fr_auto] gap-2 mb-1 items-center`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleComplete(todo.id))}
            className="rounded w-8 h-8 justify-self-center ml-4"
          />

          <span
            className="font-bold text-lg rounded p-2 bg-green-200"
          >
            {todo.task}
          </span>
          <span
            className="p-2 rounded font-bold text-lg bg-green-200"
          >
            {todo.dueDate}
          </span>
          <span
            className="rounded font-bold text-lg p-2 bg-green-200"
          >
            {todo.category}
          </span>

          <button
            onClick={() => dispatch(removeTodo(todo.id))}
            className="bg-gray-300 text-gray-950 p-2 rounded cursor-pointer h-full"
          >
            <Delete />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
