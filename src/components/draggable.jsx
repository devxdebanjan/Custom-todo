import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch } from "react-redux";
import { Delete } from "../icons/dustbin";
import { toggleComplete, removeTodo } from "../features/todoSlice";

export const Task = ({ id, task, completed, dueDate, category, color}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const dispatch = useDispatch();
  
  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    dispatch(toggleComplete(id));
  };
  
  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(removeTodo(id));
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`grid grid-cols-[0.2fr_2.8fr_1fr_1fr_auto] gap-2 mb-1 items-center`}
    >
      <div className="justify-self-center ml-4">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
          className="rounded w-8 h-8 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      
      <span
        className={`font-bold text-lg rounded p-2 ${color}`}
        {...attributes}
        {...listeners}
      >
        {task}
      </span>
      
      <span
        className={`p-2 rounded font-bold text-lg ${color}`}
      >
        {dueDate}
      </span>
      
      <span
        className={`rounded font-bold text-lg p-2 ${color}`}
      >
        {category}
      </span>
      
      <button
        onClick={handleDelete}
        className="bg-gray-300 text-gray-950 p-2 rounded cursor-pointer h-full"
      >
        <Delete />
      </button>
    </div>
  );
};