import React from 'react'

const Footer = () => {
  return (
    <div className='bg-blue-400 sticky bottom-0'>
        
            
        <div className="logo font-bold italic text-2xl flex justify-center py-1">
        <img className='w-8 h-8 mr-2' src="/icon.svg" alt="logo-icon" />
            <span className='text-yellow-600 text-3xl'>&lt;</span>
            <span className='text-white font-extrabold'>Pass</span>
            <span className='text-gray-700'>/</span>
            <span className='text-black font-extrabold'>Man</span>
            <span className='text-yellow-600 text-3xl'>&gt;</span>
            </div>
        <div className='flex justify-center items-center font-semibold '>
        © 2024 Pass/Man, inc. All rights reserved.
        </div>
    </div>
  )
}

export default Footer
