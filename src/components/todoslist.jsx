import { useSelector, useDispatch } from "react-redux";
import { reorderTodos } from "../features/todoSlice";
import { DndContext, closestCorners} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { Task } from "./draggable";

const TodoList = () => {
  const { todos, filter, searchQuery } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  //filtering the task in three categories: high, medium and low priority 
  const filteredTodosh = todos.filter((todo) => {
    if (!filter.toLowerCase().includes("all")) {
      if (filter.toLowerCase().includes("completed") && !todo.completed) return false;
      if (filter.toLowerCase().includes("incomplete") && todo.completed) return false;
      const selectedFilters = filter.toLowerCase().split(" "); 
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
      const selectedFilters = filter.toLowerCase().split(" "); 
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
      const selectedFilters = filter.toLowerCase().split(" ");
      if (!selectedFilters.includes(todo.category.toLowerCase())) return false;
    }
    if (todo.priority !== "L") {
      return false;
    }
    return todo.task.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return; 
    }
    
    // Finding which priority group the items belong to
    const findPriorityGroup = (id) => {
      const todo = todos.find(t => t.id === id);
      if (!todo) return null;
      return todo.priority;
    };
    
    const activePriority = findPriorityGroup(active.id);
    const overPriority = findPriorityGroup(over.id);
    
    // Reordering if within the same priority group
    if (activePriority === overPriority) {
      const reorderWithinPriority = (items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(items, oldIndex, newIndex);
        }
        return items;
      };
      
      // Creating a new array of all todos with the updated order
      const updatedTodos = [...todos];
      const priorityTodos = updatedTodos.filter(todo => todo.priority === activePriority);
      const reorderedPriorityTodos = reorderWithinPriority(priorityTodos);
      
      // Replacing the old todos with the same priority with the reordered ones
      let currentIndex = 0;
      for (let i = 0; i < updatedTodos.length; i++) {
        if (updatedTodos[i].priority === activePriority) {
          updatedTodos[i] = reorderedPriorityTodos[currentIndex];
          currentIndex++;
        }
      }
      
      // Dispatching the reordered todos to the store
      dispatch(reorderTodos(updatedTodos));
    }
  };
//Returning the sortable context and the sections of tasks of each priority here
  return (
    <DndContext 
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
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