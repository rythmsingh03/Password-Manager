import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';


const Manager = () => {

    const ref = useRef()
    const passref = useRef()
    const [form, setform] = useState({ url: "", username: "", password: "" })
    const [passwordarray, setpasswordarray] = useState([])

    const getpasswords=async()=>{
        let req= await fetch("http://localhost:3000/")
        let password = await req.json()
            setpasswordarray(password)
    }

    useEffect(() => {
        getpasswords()
      
    }, [])

    const copytext = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const showpassword = () => {
        passref.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passref.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passref.current.type = "text"
            alert("Showing the password")
        }
    }

    const savepassword = async() => {
        if(form.url.length<1 && form.username.length<1 && form.password.length<1){
            return
        }
        // await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
        setpasswordarray([...passwordarray, {...form, id:uuidv4()}])
        // localStorage.setItem("password", JSON.stringify([...passwordarray, {...form, id:uuidv4()}]))
        // console.log([...passwordarray, form])
        await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

        setform({ url: "", username: "", password: "" })
        toast('Password Saved!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const deletepassword=async(id)=>{
        let con=confirm("Are sure you want to Delete this Password?")
        if(con){
        setpasswordarray(passwordarray.filter(items=>items.id!==id))
        // localStorage.setItem("password", JSON.stringify(passwordarray.filter(items=>items.id!==id)))
        await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
        toast('Password Deleted Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        }
    }

    const editpassword=(id)=>{
        setform({...passwordarray.filter(items=>items.id===id)[0], id:id})
        setpasswordarray(passwordarray.filter(items=>items.id!==id))
        // localStorage.setItem("password", JSON.stringify(passwordarray.filter(items=>items.id!==id)))
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: [e.target.value] })
    }

    return (
        <>
         <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            <div className=" bg-slate-400 px-3 md:py-3 md:mycontainer text-center min-h-[85vh]">
                <h1 className='text-5xl '>
                    <span className='text-yellow-600 '>&lt;</span>
                    <span className='text-white font-semibold'>Pass</span>
                    <span className='text-gray-700'>/</span>
                    <span className='text-black font-semibold'>Man</span>
                    <span className='text-yellow-600 '>&gt;</span></h1>
                <div className='my-3 text-slate-800 font-semibold text-xl text-center'>Bharosa bhi Surakshit bhi!</div>
                <div className="flex flex-col p-5 gap-5 ">
                    <input value={form.url} onChange={handlechange} placeholder='Enter Website URl' className='rounded-xl border border-yellow-600 w-full p-3 py-1' type="text" name="url" id="url" />
                    <div className="flex flex-col md:flex-row justify-between gap-5">
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username' className='rounded-xl border border-yellow-600 w-full p-2 py-1' type="text" name='username' id='username' />
                        <div className="relative">
                            <input ref={passref} value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-xl border border-yellow-600 w-full p-2 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-0 top-1'><img ref={ref} className='px-3 cursor-pointer' onClick={showpassword} width={45} src="icons/eye.png" alt="eye" /></span>
                        </div>
                    </div>

                    <button onClick={savepassword} className="flex justify-center items-center self-center border-2  bg-yellow-500 hover:bg-yellow-300 w-fit gap-3 rounded-full px-5 py-1">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password
                    </button>
                </div>
                <div className='overflow-x-auto'>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-3'>Your Passwords:</h2>
                    {passwordarray.length === 0 && <div className='bg-slate-900 text-white italic'> No Passwords to Show...</div>}
                    {passwordarray.length != 0 && <table className="table-auto w-full overflow-hidden rounded-lg mb-5 ">
                        <thead className='bg-yellow-500 '>
                            <tr>
                                <th className='py-3 border border-black'>URL</th>
                                <th className='py-3 border border-black'>Username</th>
                                <th className='py-3 border border-black'>Password</th>
                                <th className='py-3 border border-black'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-yellow-100'>
                            {passwordarray.map((items, index) => {
                                return <tr key={index}>
                                    <td className=' py-2 border border-x-black text-center'>
                                        <div className="flex justify-center items-center">
                                                <a href={items.url} className='break-words'>{items.url}</a>
                                            <div className="size-7 cursor-pointer md:ml-5   " onClick={()=>{copytext(items.url)}}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "15 px", "cursor": "pointer" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-x-black text-center'>
                                        <div className="flex justify-center items-center">
                                            <span>{items.username}</span>
                                            <div className="size-7 cursor-pointer" onClick={()=>{copytext(items.username)}}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "5px", "cursor": "pointer" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-x-black text-center'>
                                        <div className="flex justify-center items-center">
                                            <span>{"*".repeat(items.password.length)}</span>
                                            <div className="size-7 cursor-pointer" onClick={()=>{copytext(items.password)}}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "5px", "cursor": "pointer" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>

                                    </td>
                                    <td className='py-2 border border-x-black text-center'>
                                        <div className="flex justify-center items-center gap-3">
                                        <span className='cursor-pointer mx-1' onClick={()=>{editpassword(items.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px",}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1'onClick={()=>{deletepassword(items.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px", }}>
                                            </lord-icon>
                                        </span> 
                                            
                                        </div>

                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}

                </div>
                </div>
            </div>
        </>
    )
}

export default Manager
