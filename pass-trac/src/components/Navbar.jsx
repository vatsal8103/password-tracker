import React from 'react'

const Navbar = () => {
  return (
<nav className='bg-purple-800 text-white'>
    <div className="mycontainer  flex justify-between items-center px-4 py-5 h-14">

    <div className='logo font-bold text-white text-2xl'>
        <span className='text-green-500'>&lt;</span>
        PASS-
        <span className='text-green-500'>TRAC/&gt;</span>

        
        </div>

    <button className='text-white bg-green-500 my-5 rounded-full flex justify-between items-center'>
      <img className=' w-11 p-1 ' src="icons/github.png" alt="logo" />
      <span className="font-bold px-2">  

    Github
      </span>
    </button>
    </div>
</nav>
  )
}

export default Navbar
