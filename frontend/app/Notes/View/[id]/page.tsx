"use client"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_NOTE_COMMENTS } from '../../../../graphql/queries/NoteQuery'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { CREATE_COMMENT } from '../../../../graphql/mutations/CommentMutations';
import { useSession } from 'next-auth/react';


export default function page() {
  const pathname = usePathname()
  let id = pathname?.split('/')[3]

  const session = useSession()
  const router = useRouter()
  console.log(session)
  if (session.status !== "authenticated") {
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

  const [text, setText] = useState("asd")
  const [commentText, setCommentText] = useState("")
  const [user, setUser] = useState("")
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState("")


  const {data} = useQuery(GET_NOTE_COMMENTS, {variables: {"id": id}})
  console.log(data)
  const [comment] = useMutation(CREATE_COMMENT)

  useEffect(() => {
    if (data){
      setText(data.note.body)
    }
  }, [data])

  const onClick = async () => {

    setLoading(true)
    
    const plainText = document.createElement('div');
    plainText.innerHTML = text;
    const extractedText = plainText.textContent;

    console.log(process.env.DATABASE_URL)
    const response = await fetch("https://api.oneai.com/api/v0/pipeline", {
      method: "POST",
      headers: {
        "api-key": process.env.API_KEY!,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          input: extractedText,
          input_type: "article",
          content_type: "application/json",
          output_type: "json",
          multilingual: {
            enabled: true
          },
          steps: [
            {
              skill: "summarize"
            }
          ],
      })
    })

    const sum = await response.json()

    if (sum){
      setLoading(false)
      setSummary(sum.output[0].contents[0].utterance)
    }
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    comment({variables: {"text": commentText, "Note": data.note.id, "User": session.data?.user?.name}})
    setCommentText("")
    router.refresh()
  }
  
  
  return (
    <div className='w-full'>
        <div>
          <h1 className=' text-accent text-center text-lg'>{data?.note.title}</h1>

          <div className=" w-3/4 mx-auto">
            <button className='mb-3 hover:text-slate-600' onClick={() => router.back()}>Back</button>
          </div>

          <br/><br/>

          <div className='editor w-2/3 mx-auto'>
            <CKEditor editor={ClassicEditor} data={text} />
          </div>
        </div>
        <br/>

        <div className='w-1/6 mx-auto'>
          <button className='btn btn-primary btn-outline w-full' onClick={onClick}>Summarize</button>
        </div>

        {loading &&
          <div className='mx-auto w-1/2 mt-5' role="status">
            <svg aria-hidden="true" className="w-full h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        }

        {(summary !== '' && !loading) && 
          <div className="card w-1/2 bg-base-200 shadow-xl mb-3 mx-auto px-5 mt-5">
            <h2 className=' text-lg text-blue-700'><strong>Summary</strong></h2>
            <h4>{summary}</h4>
          </div>
        }

        <br/><br/>
        
        <h1 className=' text-center text-lg'>Comments</h1>
        <div className="card w-3/5 bg-base-200 shadow-xl mb-3 mx-auto px-5 mt-5 h-96 overflow-y-scroll">
          {data?.note.comments.map((comment: any) => (
              <div>
                <div className="card w-3/5 mx-auto mt-5 bg-base-100 shadow-xl">
                  <div className="card-body">
                    <p>{comment.User.userName}: <strong className='ml-5'>{comment.text}</strong></p>
                  </div>
                </div>
                <p></p>
              </div>
          ))}


        </div>
        <form onSubmit={onSubmit}>
          <div className='w-1/4 mx-auto'>
            <input className="input input-bordered input-primary w-4/5 rounded-sm" type='text' value={commentText} placeholder="comment" onChange={(e) => {setCommentText(e.target.value)}}/>
            <button className='btn btn-primary w-1/5 rounded-sm' type='submit'>Send</button>
          </div>    
        </form>




    </div>
  )
}

