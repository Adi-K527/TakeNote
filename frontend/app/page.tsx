"use client"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { GET_COURSES, GET_USER_NOTES } from '../graphql/queries/UserQuery'
import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { CREATE_COURSE, JOIN_COURSE } from '../graphql/mutations/CourseMutation'
import { CREATE_NOTE, DELETE_NOTE } from '../graphql/mutations/NoteMutation'
import {FaTrash} from "react-icons/fa"

export default function Home() {

  const session = useSession()
  const router = useRouter()
  console.log(session)

  const courses = useQuery(GET_COURSES, {variables: {"id": session.data?.user?.name}}).data
  const notes = useQuery(GET_USER_NOTES, {variables: {"id": session.data?.user?.name}}).data

  const [joincourse] = useMutation(JOIN_COURSE)


  if (session.status == 'loading') {
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

  if (session.status === "unauthenticated") {
    router.push("/Login")
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
  




  return (
    <div className=' min-h-screen w-full'>
      <div className=" w-3/4 mx-auto">
        <br /><br /><br /><br />

        <div className='w-3/4 mx-auto'>
          <h2 className=' text-lg text-blue-700'><strong>Courses</strong></h2>
        </div>
        
        {courses?.user.courses.map(course => (
          <div className='w-full mx-auto' onClick={() => {router.push(`/Courses/${course.id}`)}}>
            <Course course={course}/>
          </div>
        ))}

        <div className='flex w-3/4 mx-auto'>
          <JoinCourse/>
          <CreateCourse/>
        </div>

        <br/><br/><br /><br />
        <div className='w-3/4 mx-auto'>
          <h2 className=' text-lg text-blue-700'><strong>Notes</strong></h2>
          <div className="grid grid-cols-3 gap-1">
            {notes?.user.notes.map(note => (
              <div className=' mr-10'>
                <Note note={note}/>
              </div>
            ))}
          </div>
          <br />
          <CreateNote />
        </div>
      </div>
      <br />
      <br />
    </div>
  )

  function JoinCourse(){
    const [courseToJoin, setCourseToJoin] = useState("")

    const joinCourse = async (e) => {
      e.preventDefault()
      const course = await joincourse({variables: {"course": courseToJoin, "user": session.data?.user?.name}})
      console.log(course)
      if (course.data.joincourse) {
        router.push("/Courses/" + course.data.joincourse.id)
      }
      else {
        const invalidMessage = document.getElementById("InvalidMessage") as HTMLInputElement | null
        invalidMessage!.style.opacity = '100'
      }
    } 

    return (
      <div className='w-full'>
        <div className='w-3/4 mx-auto'>
          <div className='w-1/2 my-auto mx-auto flex'>
            <label htmlFor="my-modal" className=' w-full mx-auto btn btn-accent btn-outline text-center hover:bg-cyan-600'>Join Course</label>
            <input type="checkbox" id="my-modal" className="modal-toggle" />

            <div className="modal">
              <div className="modal-box">
                  <h3 className="font-bold text-lg text-center">Join a Course</h3>
                  <br/>

                  <form onSubmit={joinCourse}>
                    <div className='w-2/3 mx-auto'>
                      <input className="input input-bordered input-primary w-4/5 rounded-sm" type='text' placeholder='Enter Course ID' value={courseToJoin} required onChange={(e) => {setCourseToJoin(e.target.value)}}/>
                      <button className='btn btn-primary w-1/5 rounded-sm'>Join</button>
                    </div>    
                    <p style={{opacity: 0}} id="InvalidMessage">Invalid ID</p>
    
                  <div className="modal-action">
                    <label htmlFor="my-modal" className="btn">CLOSE</label>
                  </div>
                  </form>

                  
              </div>
            </div>
          </div>
      </div>
    </div>
    )
  }

  function CreateCourse(){
    const [courseName, setCourseName] = useState("")
    const [courseDesc, setCourseDesc] = useState("")

    const [createcourse] = useMutation(CREATE_COURSE)

    const CreateCourse = async (e) => {
      e.preventDefault()
      const course = await createcourse({variables: {"name": courseName, "description": courseDesc, "user": session.data?.user?.name}})
      await joincourse({variables: {"course": course.data.createcourse.id, "user": session.data?.user?.name}})
      router.push("/Courses/" + course.data.createcourse.id)
    }

    return (
      <div className='w-full'>
        <div className='w-3/4 mx-auto'>
          <div className='w-1/2 my-auto mx-auto flex'>
            <label htmlFor="my-modal-create" className=' w-full mx-auto btn btn-primary btn-outline text-center'>Create Course</label>
            <input type="checkbox" id="my-modal-create" className="modal-toggle" />

            <div className="modal">
              <div className="modal-box">
                  <h3 className="font-bold text-lg text-center">Create a Course</h3>
                  <br/>

                  <form onSubmit={CreateCourse}>
                    <div className='w-2/3 mx-auto'>
                      <input className="input input-bordered input-primary w-full rounded-sm" type='text' placeholder='Enter a Course Name' value={courseName} onChange={(e) => {setCourseName(e.target.value)}}/>
                      <input className="input input-bordered input-primary w-full rounded-sm" type='text' placeholder='Enter a Description' value={courseDesc} onChange={(e) => {setCourseDesc(e.target.value)}}/>
                      <div className='w-2/5 mx-auto'>
                        <button className='btn btn-primary w-full rounded-sm mx-auto' type='submit'>Join</button>
                      </div>
                    </div>    
                  </form>
  
                <div className="modal-action">
                  <label htmlFor="my-modal-create" className="btn">CLOSE</label>
                </div>
              </div>
            </div>

          </div>
      </div>
    </div>
    )
  }

  function CreateNote(){
    const [caption, setCaption] = useState("")
    const [title, setTitle] = useState("")
    const [newNote, setNewNote] = useState("")

    const [createnote] = useMutation(CREATE_NOTE, {refetchQueries: [{query: GET_USER_NOTES, variables: {"id": session.data?.user?.name}}]});

    const ActuallyCreateNote = async (e: any) => {
      e.preventDefault()
      const {data} = await createnote({variables: {"title": title, "body": "Edit Note..." ,"user": session.data?.user?.name, "caption": caption}})
      router.push("/Notes/" + data.createnote.id)
    } 

    return (
      <div className='w-full'>
        <div className='w-full mx-auto'>
          <div className='w-1/5 my-auto mx-auto'>
            <label htmlFor="my-modal-note" className=' w-full mx-auto btn btn-accent btn-outline text-center hover:bg-cyan-600'>Create Note</label>
            <input type="checkbox" id="my-modal-note" className="modal-toggle modal-open" />

            <div className="modal">
              <div className="modal-box">
                  <h3 className="font-bold text-lg text-center">Create a Note</h3>
                  <br/>

                <form onSubmit={ActuallyCreateNote}>
                  <div className='w-2/3 mx-auto'>
                    <input className="input input-bordered input-primary w-full rounded-sm" type='text' placeholder='Enter a Title' value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                    <input className="input input-bordered input-primary w-full rounded-sm" type='text' placeholder='Enter a Caption' value={caption} onChange={(e) => {setCaption(e.target.value)}}/>
                    <div className='w-1/3 mx-auto mt-2'>
                      <button className='btn btn-primary w-full mx-auto rounded-sm' type='submit'>Create</button>
                    </div>
                  </div>    
                </form>
  
                <div className="modal-action">
                  <label htmlFor="my-modal-note" className="btn">CLOSE</label>
                </div>
              </div>
            </div>

          </div>
      </div>
    </div>
    )
  }

  function Course({course}) {
    return(
      <div className="card w-3/4 bg-base-200 shadow-xl mb-3 mx-auto hover:bg-base-300 hover:cursor-pointer">
        <div className="card-body">
          <h2 className="card-title">{course.name}</h2>
          <p>{course.description}</p>
        </div>
      </div> 
    )
  }

  function Note({note}) {

    const [deletenote] = useMutation(DELETE_NOTE, {refetchQueries: [{query: GET_USER_NOTES, variables: {"id": session.data?.user?.name}}]})

    const deleteNote = async () => {
      await deletenote({variables: {"note": note.id}})
    }

    return(
      <div className="card w-50 bg-base-200 shadow-xl mb-3 mx-auto">
        <div className="card-body">
          <h3 className="card-title">{note.title}</h3>
          <p>{note.caption ? note.caption : "No caption has been provided."}</p>
          <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => {router.push(`/Notes/${note.id}`)}}>View</button>
          <button className="btn bg-red-500 outline-none hover:bg-red-600 border-red-500" onClick={deleteNote}>
            <FaTrash />
          </button>
          </div>
        </div>
      </div>  
    )
  }
}
