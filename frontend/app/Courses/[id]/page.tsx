"use client"
import { useMutation, useQuery } from '@apollo/client'
import { usePathname } from 'next/navigation'
import { GET_COURSE, GET_COURSE_MESSAGES, GET_COURSE_NOTES } from '../../../graphql/queries/CourseQuery'
import { useState } from 'react';
import { POST_NOTE } from '../../../graphql/mutations/CourseMutation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { GET_USER_NOTES } from '../../../graphql/queries/UserQuery';
import { LEAVE_COURSE } from '../../../graphql/mutations/UserMutation';
import Chat from './Chat'


export default function page() {
  const router = useRouter()
  const pathname = usePathname()
  const session = useSession()

  let id = pathname?.split('/')[2]


  const { data, loading: courseLoad } = useQuery(GET_COURSE, {variables: {id}})
  console.log(data)

  const {data: userNotes, loading} = useQuery(GET_USER_NOTES, {variables: {"id": session.data?.user?.name}})
  const {data: courseNotes, loading: Loading} = useQuery(GET_COURSE_NOTES, {variables: {id}})
  const { loading: mLoad, data: messages } = useQuery(GET_COURSE_MESSAGES, {variables: {id}})


  const [note, setNote] = useState("")
  const [courseId, setCourseID] = useState(false)
  const [notes, setNotes] = useState(true)

  const [postnote] = useMutation(POST_NOTE)
  const [leavecourse] = useMutation(LEAVE_COURSE)

  var isMember = false

  if (loading || Loading || courseLoad){
    return (
      <div className='mx-auto w-1/2 mt-5' role="status">
        <svg aria-hidden="true" className="w-full h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
  else {
    console.log(data)
    data.course.members.forEach(member => {
      if (member.id === session.data?.user?.name){
        isMember = true
      }
    });
    if (!isMember) {
      router.back()
      return (
        <div className='mx-auto w-1/2 mt-5' role="status">
          <svg aria-hidden="true" className="w-full h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )
    }
  }

  const onSubmit = (note: string) => {
    console.log("posted")
    postnote({variables: {"note": note, "course": id}})
    router.refresh()
  }

  const leave = async () => {
    await leavecourse({variables: {"course": data?.course.id, "user": session.data?.user?.name}})
    console.log("left")
    router.push("/")
  }


  return (
    <div className='min-h-full w-full'>
      {isMember && (

     
      <div className=" w-3/4 mx-auto">

        <br /><br />
        
        <button className=' hover:text-slate-300' onClick={() => {router.push("/")}}>Back</button>


        <br /><br />
        <div className='w-full flex'>
          <div className='card w-1/4 bg-base-200 shadow-xl mb-3 mr-5 px-5 h-96'>
            <h1 className='text-accent text-3xl text-center'><strong>{data?.course.name}</strong></h1>
            
            <div className='h-12'/>
            {!courseId ? 
              <p className='hover:text-slate-500 hover:cursor-pointer' onClick={() => setCourseID(true)}>Show Course ID</p>:
              <p>{data?.course.id}</p>  
            }
            <p className='hover:text-slate-500 hover:cursor-pointer' onClick={() => setCourseID(data?.course.id)}>{courseId}</p>
            <div className='h-5'/>
            
            <button className=' w-full mx-auto btn btn-accent btn-outline text-center mb-7 hover:bg-cyan-600' onClick={() => {
              router.refresh()
              setNotes(true)}}>Notes
            </button>
            <button className=' w-full mx-auto btn btn-accent btn-outline text-center mb-7 hover:bg-cyan-600' onClick={() => {
              router.refresh()
              setNotes(false)}}>Chat
            </button>

            
            <div className='h-12'/>
            <button className=' w-1/2 mx-auto btn btn-error btn-outline text-center mb-7 hover:bg-cyan-600' onClick={leave}>Leave</button>

          </div>
          
          {notes ? 
            <NotesThing />
            :
            <Chat course={data} data={messages}/>
          }
          
        </div>
        
        <br /><br /><br /><br />
      </div>
         )}
    </div>
  )
  
  function Note({note}) {
    return (
      <div className="card w-96 bg-base-300 shadow-xl hover:bg-base-200" onClick={() => onSubmit(note.id)}>
        <div className="card-body">
          <h2 className="card-title">{note.title}</h2>
          <p>{note.caption ? note.caption : "No caption has been provided."}</p>
        </div>
      </div>
    )
  }

  function NotesThing(){
    return (
      <div className="card w-3/4 bg-base-200 shadow-xl mb-3 mx-auto px-5 h-96 overflow-y-scroll">
      {courseNotes.course.notes.length > 0 ? 
        courseNotes.course.notes.map((note: any) => (
          <div>
            <div className="card w-3/4 bg-base-200 shadow-xl mb-3 mx-auto hover:bg-base-300 hover:cursor-pointer" onClick={() => router.push(`/Notes/View/${note.id}`)}>
              <div className="card-body">
                <h2 className="card-title text-accent">{note.title}</h2>
                <p>{note.caption ? note.caption : "No caption has been provided."}</p>
                <div className="chat-header mr-10">
                  <p>Created By: <strong>{note.createdBy.userName}</strong></p>
                </div>
              </div>
            </div> 
          </div>
          
        ))
        
      : 
        <p className='mt-5'>No notes to be displayed...</p>
      }
      <Modal/>
    </div>
    )
  }

  function Modal(){
    return (
      <div className='w-1/5 mx-auto'>
      <label htmlFor="my-modal" className="btn btn-primary w-full">Select</label>
  
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
  
          <h3 className="font-bold text-lg text-center">Select a note</h3>
          <br />
  
          {userNotes && (
            userNotes.user.notes.map(note => (
              <div>
                <Note note={note} />
                <br/>
              </div>
            ))
          )}
  
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn">CLOSE</label>
          </div>
        </div>
      </div>
    </div>
    )
  }
}


