import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-400  '>
        <div className="mycontainer flex justify-between items-center px-5 py-5 h-12">

        <div className="flex justify-center items-center  logo font-bold italic text-2xl">
        <img className='w-10 h-10 mr-2' src="/icon.svg" alt="logo-icon" />
            <span className='text-yellow-600 text-3xl'>&lt;</span>
            <span className='text-white font-extrabold'>Pass</span>
            <span className='text-gray-700'>/</span>
            <span className='text-black font-extrabold'>Man</span>
            <span className='text-yellow-600 text-3xl'>&gt;</span>
            </div>
      {/* <ul>
        <li className='flex gap-5'>
        <a className='text-lg font-semibold hover:font-bold' href="#">Home</a>
        <a className='text-lg font-semibold hover:font-bold' href="#">About</a>
        <a className='text-lg font-semibold hover:font-bold' href="#">Contact</a>
        <a className='text-lg font-semibold hover:font-bold' href="#">Theme</a>
        </li>
      </ul> */}
      <button className=' w-28 flex justify-center items-center gap-1 bg-slate-300 px-1 rounded-full ring-black ring-1'>
        <img className='w-10' src="/icons/github.svg" alt="github" />
        <span className='font-bold text-lg'>Github</span>
      </button>
        </div>
    </nav>
  )
}

export default Navbar
