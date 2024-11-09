import { useState } from 'react'
import './App.css'
import Navbar from './componenets/Navbar'
import Manager from './componenets/Manager'
import Footer from './componenets/Footer'

function App() {
 

  return (
    <>
    <Navbar/>
    <div className='min-h-[85vh]'>
    <Manager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
