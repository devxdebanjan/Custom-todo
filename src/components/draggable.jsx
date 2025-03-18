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
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`grid grid-cols-[0.2fr_2.8fr_1fr_1fr_auto] gap-2 mb-1 items-center`}
    >
      <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => dispatch(toggleComplete(id))}
                  className="rounded w-8 h-8 justify-self-center ml-4"
                />
      
                <span
                  className={`font-bold text-lg rounded p-2 ${color}`}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeTodo(id));
                  }}
                  className="bg-gray-300 text-gray-950 p-2 rounded cursor-pointer h-full"
                >
                  <Delete />
                </button>
    </div>
  );
};