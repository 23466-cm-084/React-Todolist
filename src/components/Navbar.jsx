import React from 'react'

const Navbar = () => {
  return (
    <div className='nav flex justify-between items-center  bg-indigo-900 text-white py-1'>
      <div className="logo mx-2 flex items-center font-bold text-xl"><img src="todoimg.png" alt="" />iTask</div>
      <ul className='flex gap-5  sm:font-thin  mx-4 '>
        <li className='hover:text-lg text-sm sm:text-lg'>Home</li>
        <li className='hover:text-lg text-sm sm:text-lg'>TodoTasks</li>
      </ul>

    </div>
  )
}

export default Navbar
