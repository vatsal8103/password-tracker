import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordarray, setpasswordarray] = useState([])


    const getpasswords = async () => {
        let req = await fetch('http://localhost:3000/')
        let passwords = await req.json()
        console.log(passwords)
        setpasswordarray(passwords)


    }
    useEffect(() => {
        getpasswords();


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
            theme: "dark",

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
    const savepassword = async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            //if any such id exists in the db ,delete it
            await fetch("http://localhost:3000/" , {method:"DELETE",headers:{"content-type":"application/json"},
            body :JSON.stringify([...passwordarray, {id :form.id}])})

            setpasswordarray([...passwordarray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/" , {method:"post",headers:{"content-type":"application/json"},
            body :JSON.stringify([...passwordarray, { ...form, id: uuidv4() }])})
        
            // localStorage.setItem("passwords", JSON.stringify([...passwordarray, { ...form, id: uuidv4() }]))
            // console.log(...passwordarray, form);
            setform({ site: "", username: "", password: "" })

            toast('password saved  !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        } else {
            toast("Error : passowrd not saved!");

        }

    }
    const deletepassword = async(id) => {
        console.log("deleting the id ", id)
        setpasswordarray(passwordarray.filter(item => item.id !== id))
        // localStorage.setItem("passwords", JSON.stringify(passwordarray.filter(item => item.id !== id)))
          let res= await fetch("http://localhost:3000/" , {method:"DELETE",headers:{"content-type":"application/json"},
            body :JSON.stringify([...passwordarray, {id}])})

        // console.log(...passwordarray, form);
        toast('Password deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });

    }
    const editpassword = (id) => {
        console.log("editing the id ", id)
        setform({...passwordarray.filter(i => i.id === id)[0] , id :id})

        setpasswordarray(passwordarray.filter(item => item.id !== id))

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
            <div className="max-w-4xl mx-auto p-4 min-h-[88vh]">

                <h1 className=' text-4xl text font-bold text-center'>
                    <span className='text-purple-700'>&lt;Pass-</span>
                    <span className='text-green-500'>Trac/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'> your own passowrd tracker</p>

                <div className=" flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handlechange} placeholder='Enter URL' className="rounded-full border  border-green-500 w-full text-black bg-slate-500 p-4 py-1" type="text" name='site' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
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
                        Save  </button>


                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl text-purple-400  py-4'>Your passwords</h2>
                    {passwordarray.length === 0 && <div className='text-green-500'> No passwords to show</div>}
                    {passwordarray.length != 0 && (<table className='table-auto w-full rounded-md overflow-hidden shadow-lg mb-10'>
                        <thead className='text-center text--white bg-green-800'>
                            <tr className='bg-green-800 text-white'>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className="py-2">Actions</th>
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
                                        <span className=' cursor-pointer mx-1' onClick={() => { editpassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.Lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className=' cursor-pointer mx-1' onClick={() => { deletepassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>


                                    </td>
                                </tr>
                            })}

                        </tbody>

                    </table>
                    )}
                </div>
            </div>
        </>
    )
}

export default Manager
