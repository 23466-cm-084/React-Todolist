import { useState, useEffect } from 'react'
import React from 'react'
import Navbar from './components/Navbar'
import { MdOutlineSaveAlt } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./App.css"
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("")   //it takes the todo's from input bar
  const [todos, setTodos] = useState([]) // it stores the all todo's as an array
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => { // saveToLocalStorage
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleChange = (e) => {
    setTodo(e.target.value) //here i set the todo value by using the setTodo() method
  }
  // now here i passing the todo from input bar to the "todos" array when add button is clicked


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")   //now I'm again reseting the input bar todo empty
    saveToLS()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => {
      return item.id === id;
    })
    setTodo(t[0].todo) //here we get an array of values that's why we store it in "t[0]" array and accessing just the todo value and setting todo by setTodo() method we set todo value which is used as "value={todo}" in input bar so t[0].todo sets todo name which display in the input bar and we delete the existing todo and as usuall when you click on the save button it creates it as a new todo 
    //now we just delete the existing todo to make real updating illusion i.e,
    let newTodos = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    // console.log(id)
    let newTodos = todos.filter(item => {
      // console.log(item.id !== id)
      return item.id !== id; //it return false because the condition isn't true and now it will return 0 so the particular todo will be deleted
    })
    // console.log(newTodos)
    setTodos(newTodos)
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;  // it returns the id when the id in  todo's array is equal to the let id=e.target.name
    })
    let newTodos = [...todos];
    console.log(newTodos[index].isCompleted)
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    console.log(newTodos[index].isCompleted)
    setTodos(newTodos) //here we taken whole newTodos as todos array and we just toggle the iscompleted and changed and now set that selected todo value by using setTodo() method i.e., we used the "newTodos" just to change the boolean value and send normally to todo
    // console.log(newTodos)
    saveToLS()
  }

  const toggleFinished = (e) => {
    console.log(showFinished)
    setshowFinished(!showFinished)
    console.log(!showFinished)
  }


  return (
    <>
      <div className="main">
        <Navbar />
        <div className="md:container md:w-3/4  bg-violet-100 rounded-lg min-h-[80vh] my-3 sm:my-7 mx-3 md:mx-auto">

          {/* To type and save the todo's  */}
          <div className="addtodo md:px-5 py-3 mx-3 mb-0">
            <h1 className='font-bold text-2xl text-center mb-3'>iTask - Manage Your Todos At One Place</h1>
            <h1 className='font-bold my-2 text-lg'>Add a Todo</h1>
            {/* value={todo}  if won't write this the input bar will not get empty everytime you click on save i.e., you have to remove the text everytime try once without it you will know*/}
            <div className="flex items-center">
              <input type="text" onChange={handleChange} value={todo} className='bg-white w-[75%] lg:w-[90%]  rounded-full py-0.5 ' />
              <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-indigo-700 text-white ml-3 rounded-full text-sm px-3 py-1 hover:bg-indigo-950 disabled:bg-violet-700 hover:cursor-pointer'>
                <MdOutlineSaveAlt className=" font-bold text-lg  md:hidden" />
                <span className="hidden md:inline">Save</span>
              </button>
            </div>
          </div>

          {/* To display the typed todo's   */}
          <div className="yourtodos md:px-5 py-0 mx-3 mt-0">
            <input onChange={toggleFinished} type="checkbox" id='show' className='hover:cursor-pointer' checked={showFinished} />&nbsp;&nbsp;<label htmlFor="show">Show Finished</label>
            <div className="h-[2px] bg-black opacity-15 my-2"></div>
            <h1 className='font-bold text-lg' >Your Todo</h1>

            {todos.length === 0 && <div className='m-3'>No Todos to display</div>}
            {todos.map(item => {
              {/* // key={uuidv4()} which is item.id it is used to just generate unique id's, because it asks you to give unique id's every time */ }

              // if showfinished is true then it will display all the todo's but when it is false then it will display the not striked todos ie, !item.isCompleted returns false means it display the not completed(plain) todos
              return (showFinished || !item.isCompleted) && <div key={item.id} className="todos my-2">
                <div className="todo flex items-center justify-between">
                  <div className='flex gap-5 break-all'>
                    <input type="checkbox" onClick={handleCheckbox} className='hover:cursor-pointer' name={item.id} />
                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>

                  <div className="buttons flex h-full ">
                    <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-indigo-700 hover:cursor-pointer text-white ml-2 rounded-md text-sm px-2 py-1 hover:bg-indigo-950'><FaEdit /></button>
                    <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-indigo-700 hover:cursor-pointer text-white ml-2 rounded-md text-sm px-2 py-1 hover:bg-indigo-950'><MdDelete /></button>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
