import { useState } from 'react'
import './App.css'
import './components/addtodo'
import Addtodo from './components/addtodo'
import TodoList from './components/todoslist'
import Filter from './components/filter'
import SearchBar from './components/searchBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='w-screen py-5 text-center text-4xl font-bold'>CUSTOM TODO APP</div>
    <Addtodo/>
    <div className='flex items-center mt-4 justify-between'>
    <div className="font-bold text-zinc-700 text-3xl flex mx-4 mb-2">Your Tasks</div>
    <div className="flex items-center gap-4">
    <Filter/>
    <SearchBar/>
    </div>
    </div>
    
    
    <TodoList/>
    </>
  )
}

export default App
