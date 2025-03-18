import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";
import { Ci } from "../icons/calendar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Addtodo() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    if (!task.trim() || !date || !category) return;
    dispatch(
      addTodo({
        task: task,
        priority: selectedPriority,
        category: category,
        dueDate: date ? new Date(date).toLocaleDateString("en-GB") : null,
      })
    );
    console.log(category);
    setTask("");
    setSelectedPriority("");
    setCategory("");
    setShowCalendar(false);
  };

  return (
    <div className="flex self-center justify-self-center items-center h-12">
      <form className="flex h-full items-center gap-2">
        <input
          type="text"
          value={task}
          name="todo"
          placeholder="Add ToDo item..."
          className="border-2 mx-2 p-2 rounded-md w-100 focus:outline-none placeholder:font-bold h-full"
          onChange={(e) => setTask(e.target.value)}
          required
        />

        <div className="flex p-1.5 border-2 rounded-md items-center gap-1 mx-2 h-full">
          <label
            className={`flex items-center gap-1 cursor-pointer  ${
              selectedPriority === "H"
                ? "bg-red-500 text-white w-10 h-10"
                : "bg-red-300"
            } rounded-full w-8 h-8 flex items-center justify-center text-black text-sm font-bold`}
            onClick={() => {
              if (selectedPriority !== "H") {
                setSelectedPriority("H");
              } else setSelectedPriority("");
            }}
          >
            H
          </label>

          <label
            className={`flex items-center gap-1 cursor-pointer ${
              selectedPriority === "M"
                ? "bg-yellow-300 w-10 h-10"
                : "bg-yellow-200"
            } rounded-full w-8 h-8 flex items-center justify-center text-black text-sm font-bold`}
            onClick={() => {
              if (selectedPriority !== "M") {
                setSelectedPriority("M");
              } else setSelectedPriority("");
            }}
          >
            M
          </label>

          <label
            className={`flex items-center gap-1 cursor-pointer ${
              selectedPriority === "L"
                ? "bg-green-500 text-white w-10 h-10"
                : "bg-green-200"
            } rounded-full w-8 h-8 flex items-center justify-center text-black text-sm font-bold`}
            onClick={() => {
              if (selectedPriority !== "L") {
                setSelectedPriority("L");
              } else setSelectedPriority("");
            }}
          >
            L
          </label>
        </div>

        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 border-black p-2 rounded-md text-gray-500 focus:outline-none mx-2 h-full font-bold cursor-pointer"
          required
        >
          <option value="">Select Category</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Family">Family</option>
          <option value="Household">Household</option>
          <option value="Others">Others</option>
        </select>
        
        <div className="relative h-full">
          <button
            type="button"
            className="cursor-pointer border-2 px-4 font-bold py-1 rounded-md focus:outline-none mx-2 flex items-center space-x-2 h-full"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <span className="text-gray-500">Due Date</span>
            <Ci />
          </button>
          {showCalendar && (
            <div className="absolute left-0 mt-2 z-10 bg-white shadow-lg p-2 rounded-md">
              <Calendar onChange={setDate} value={date} />
            </div>
          )}
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-400 border-2 border-blue-500 text-white px-4 py-2 rounded-md h-full font-bold cursor-pointer hover:bg-blue-500"
        >
          Add ToDo
        </button>
      </form>
    </div>
  );
}

export default Addtodo;
