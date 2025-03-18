import {createSlice, nanoid } from '@reduxjs/toolkit';
// we define the initial state of the tasks
const initialState = {
    todos: [
      {
        id: nanoid(),
        task: "Apply to JdeRobot internship",
        priority: "H",
        category: "Work",
        dueDate: "16/03/2025",
        completed: false
      },
      {
        id: nanoid(),
        task: "Buy groceries",
        priority: "L",
        category: "Household",
        dueDate: "16/03/2025",
        completed: false
      },
      {
        id: nanoid(),
        task: "Pay bills",
        priority: "M",
        category: "Family",
        dueDate: "16/03/2025",
        completed: false
      },
    ],
    filter: "All",
    searchQuery: "",
  };

// we create the slice and add all the actions
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
        const { task, priority, category, dueDate } = action.payload;
        const todo = {
            id: nanoid(),
            task,
            priority,
            category,
            dueDate,
            completed: false
        };
      state.todos.push(todo);
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    reorderTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

//now we export the actions
export const { addTodo, toggleComplete, removeTodo, setFilter, setSearchQuery, reorderTodos } = todosSlice.actions;
export default todosSlice.reducer;
