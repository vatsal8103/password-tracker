import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordarray, setpasswordarray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        let passwordarray;

        if (passwords) {
            passwordarray = JSON.parse(passwords);
        }

    }, [])

    const copyText = (text) => {
        toast('copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)

    }

    const showpassword = () => {
        passwordref.current.type = "text"
        if (ref.current.src.includes("icons/hidden.png")) {

            ref.current.src = "icons/eye.png"
            passwordref.current.type = "text"
        }
        else {
            passwordref.current.type = "password"
            ref.current.src = "icons/hidden.png"
        }

    }
    const savepassword = () => {
        setpasswordarray([...passwordarray, form])
        localStorage.setItem("passwords", JSON.stringify([...passwordarray, form]))
        console.log(...passwordarray, form);

    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })

    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover

            />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <div className="  b mycontainer">
                <h1 className=' text-4xl text font-bold text-center'>
                    <span className='text-purple-700'>&lt;Pass-</span>
                    <span className='text-green-500'>Trac/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'> your own passowrd tracker</p>

                <div className=" flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handlechange} placeholder='Enter URL' className="rounded-full border  border-green-500 w-full text-black bg-slate-500 p-4 py-1" type="text" name='site' />
                    <div className="flex w-full justify-between gap-8">
                        <input value={form.username} onChange={handlechange} placeholder='Enter USERNAME' className="rounded-full border border-green-500 w-full text-black bg-slate-500 p-4 py-1" type="text" name='username' />
                        <div className="relative">

                            <input ref={passwordref} value={form.password} onChange={handlechange} placeholder='Enter PASSWORD' className="rounded-full border border-green-500 bg-slate-500 w-full text-black p-4 py-1" type="password" name='password' />
                            <span className="absolute right-[3px] top-[3px] cursor-pointer" onClick={showpassword}>
                                <img ref={ref} className=" eye color-white p-1" width={25} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>


                    </div>
                    <button onClick={savepassword} className='flex justify-center items-center gap-4 bg-green-400  hover:bg-green-500 rounded-full px-2 py-2 w-fit border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        Add Password </button>


                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl text-purple-400  py-4'>Your passwords</h2>
                    {passwordarray.length === 0 && <div> No passwords to show</div>}
                    {passwordarray.length != 0 && (<table className='table-auto w-full rounded-md overflow-hidden'>
                        <table className='table-auto w-full rounded-md overflow-hidden shadow-lg'>
                            <thead className='text-center text--white bg-green-800'>
                                <tr className='bg-green-800 text-white'>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200'>
                                {passwordarray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className="  py-2 border border-white text-center">
                                            <div className='flex  items-center justify-center' onClick={() => { copyText(item.site) }}>
                                                <a href={item.site} target="_blank" className="href">{item.site}</a>
                                                <div className="size-7 cursor-pointer">


                                                    <lord-icon
                                                        style={{ "width": "25px", height: "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">

                                                    </lord-icon>


                                                </div>
                                            </div>

                                        </td>

                                        <td className="py-2 border  border-white text-center ">
                                            <div className='flex  items-center justify-center'>
                                                <span>{item.username}</span>
                                                <div className="lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.username) }}>


                                                    <lord-icon onClick={() => { copyText(item.site) }}
                                                        style={{ "width": "25px", height: "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">

                                                    </lord-icon>


                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2 flex items-center   border border-white text-center ">
                                            <div className='flex  items-center justify-center'>
                                                <span>{item.password}</span>
                                                <div className=" lordiconcopy size-7 cursor-pointer" onClick={() => { copyText(item.password) }}>


                                                    <lord-icon
                                                        style={{ "width": "25px", height: "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover">

                                                    </lord-icon>


                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-2  justify-center  border border-white text-center ">
                                            <span>
                                                <lord-icon
                                                    src="https://cdn.Lordicon.com/gwlusjdu.json"
                                                    trigger ="hover"
                                                    style={{"width": "25px","height":"25px"}}>
                                                </lord-icon>
                                            </span>


                                        </td>
                                    </tr>
                                })}

                            </tbody>

                        </table>
                    </table>)}
                </div>
            </div>
        </>
    )
}

export default Manager
