"use client"
import { useMutation } from '@apollo/client'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect, LegacyRef } from 'react';
import { useRouter } from 'next/navigation';
import {io} from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { SEND_MESSAGE } from '../../../graphql/mutations/CourseMutation';




export default function Chat({data, course}) {
  console.log(data, course)
  const pathname = usePathname()
  let id = pathname?.split('/')[2]
  

  const router = useRouter()
  const session = useSession()

  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<any[]>([])


  const [sendmessage] = useMutation(SEND_MESSAGE)

  const dummy = useRef<HTMLSpanElement>(null);

  const socket = io("https://takenotebackend.onrender.com")

  useEffect(() => { 
    socket.on("message", (message) => {
      setMessages([...messages, message])
      setTimeout(() => {
        dummy.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100)
    })
    return () => {
      socket.off('message');
    };
  }, [messages]); 

  useEffect(() => {
    if (data) {
      setMessages(data.course.messages)
    }
  }, [data])


  const onSubmit = async (e) => {
    e.preventDefault()
    const sent = await sendmessage({variables: {"text": message, "creator": session.data?.user?.name, "course": id}})
    socket.emit("message", (sent.data.message))
    setMessage("")

  }


  return (
        <div className='w-3/4'>
          <div className="card w-full bg-base-200 shadow-xl mb-3 mx-auto px-5 h-96 overflow-y-scroll" id="chat">
            { 
              messages.map(message => (
                <div>
                  {message.creator.userName !== session.data?.user?.email ?
                    <div className="chat chat-start">
                      <div className="chat-header">
                        {message.creator.userName}
                      </div>
                      <div className="chat-bubble">{message.text}</div>
                    </div>  
                :
                    <div className="chat chat-end">
                      <div className="chat-header">
                        {message.creator.userName}
                      </div>
                      <div className="chat-bubble">{message.text}</div>
                    </div> 
                }
                <span ref={dummy}></span>
                </div>
              ))}

          </div>
          
          <br/>
          <div className='w-full'>
            <form onSubmit={onSubmit}>
              <div className='w-1/2 mx-auto'>
                <input className="input input-bordered input-primary w-4/5 rounded-sm" type="text" value={message} placeholder="Enter message" onChange={(e) => {setMessage(e.target.value)}}/>
                <button className='btn btn-primary w-1/5 rounded-sm' type='submit'>Send</button>
              </div>
            </form>
          </div>
        </div>
  )
}

