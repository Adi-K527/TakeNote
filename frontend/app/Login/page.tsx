"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {signIn} from "next-auth/react"
import Editor from "../../public/Editor.png"


export default function page() {

  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  console.log(Editor)


  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", { 
      username: username,
      password: password,
      redirect: false,
    })
    if (!res?.error){
      router.push("/")
    }
    else {
      const checkbox = document.getElementById("invalid-check") as HTMLInputElement | null;
      checkbox!.checked = true
    }
  };


  return (
    <div className="min-h-screen">

      <br/>
      <div className="min-h-screen flex items-center">
        <div className="w-full flex">
          <div className="w-3/4 h-4/5 mt-10">
            <img className="w-full h-full blur-sm" src={Editor.src}  alt="Editor" />
            <img className="w-full h-full blur-sm" src={Editor.src}  alt="Editor" />

          </div>

          <div className='w-1/2 items-center justify-center'>
            <div className="h-36"/>
            <div className="w-full mx-auto items-center mt-10 mb-10">
              <h1 className="w-full text-8xl"><strong><span className=" text-black">Take</span><span className=" text-blue-800">Note</span></strong></h1>
            </div>
            <form onSubmit={onSubmit}>
              <div className='w-2/3'>
                <input className="input input-bordered input-primary w-full rounded-sm" type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input className="input input-bordered input-primary w-full rounded-sm" type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <div className='w-5/6 mt-8 mx-auto'>
                  <button className='btn btn-accent btn-outline w-full' type='submit'>Login</button>
                  <p className="mt-3 text-blue-500 text-center hover:text-blue-700 hover:cursor-pointer" onClick={() => router.push("/Register")}>Dont have an Account?</p>
                </div>
                  <input type="checkbox" id="invalid-check" className="modal-toggle" />
                  <label htmlFor="invalid-check" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                      <h3 className="text-lg font-bold text-center text-red-500">Invalid Credentials</h3>
                    </label>
                  </label>
              </div>    
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}
