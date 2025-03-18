import { useSelector, useDispatch } from "react-redux";
import { toggleComplete, removeTodo } from "../features/todoSlice";
import { Delete } from "../icons/dustbin";
import { DndContext, closestCorners} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, } from "@dnd-kit/sortable";
import { Task } from "./draggable";

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
    <DndContext collisionDetection={closestCorners}>
    <div className="p-4">
      <div className="grid grid-cols-[2.7fr_0.9fr_1fr] gap-2 mb-1 text-gray-500 font-bold">
        <div className="font text-lg ">High Priority</div>
        <div className="font text-lg text-left">Date</div>
        <div className="font text-lg">Category</div>
      </div>
      <SortableContext items={filteredTodosh} strategy={verticalListSortingStrategy}>
      {filteredTodosh.map((todo) => (
        <Task
          key={todo.id}
          id={todo.id}
          task={todo.task}
          completed={todo.completed}
          dueDate={todo.dueDate}
          category={todo.category}
          color={"bg-red-300"}
        />
      ))}
      </SortableContext>
      <h3 className="font-bold text-lg  text-gray-500">Medium Priority</h3>
      <SortableContext items={filteredTodosm} strategy={verticalListSortingStrategy}>
      {filteredTodosm.map((todo) => (
        <Task
          key={todo.id}
          id={todo.id}
          task={todo.task}
          completed={todo.completed}
          dueDate={todo.dueDate}
          category={todo.category}
          color={"bg-yellow-200"}
        />
      ))}
      </SortableContext>
      <h3 className="font-bold text-lg  text-gray-500">Low Priority</h3>
      <SortableContext items={filteredTodosl} strategy={verticalListSortingStrategy}>
      {filteredTodosl.map((todo) => (
        <Task
          key={todo.id}
          id={todo.id}
          task={todo.task}
          completed={todo.completed}
          dueDate={todo.dueDate}
          category={todo.category}
          color={"bg-green-200"}
        />
      ))}
      </SortableContext>
    </div>
    </DndContext>
  );
};

export default TodoList;
