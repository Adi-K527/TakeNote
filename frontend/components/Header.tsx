import { useSession } from 'next-auth/react'
import React from 'react'
import {signOut} from "next-auth/react"
//

export default function Header() {
  const session = useSession()

  const logout = async () => {
    const res = await signOut()
    console.log(res)
  }

  return (
    <div className='bg-base-200 h-12 flex'>
        <h1 className="w-full justify-center my-auto ml-10 text-3xl"><strong><span className=" text-black">Take</span><span className=" text-blue-800">Note</span></strong></h1>
        {session.data?.user && (
            <div className="w-1/6 mx-auto my-auto mr-10 dropdown">
                <label tabIndex={0} className='w-full text-accent my-auto mr-10 text-lg hover:text-teal-600 hover:cursor-pointer'>Welcome <strong>{session.data?.user?.email}</strong></label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a onClick={logout}>Logout</a></li>
                </ul>
            </div>
        )}

    </div>
  )
}
