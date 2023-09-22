import { useEffect, useState } from 'react'
import { API } from 'aws-amplify'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
// import SimpleMDE from "react-simplemde-editor"
// import "easymde/dist/easymde.min.css"
import { updateComment } from '../../graphql/mutations'
import { getComment } from '../../graphql/queries'

const EditComment = () => {
  const location = useLocation()
  const postId = location.state

  const [comment, setComment] = useState(null)
  let { id } = useParams()  //comment id

  let navigate = useNavigate()

  useEffect(() => {
    fetchComment()
  }, [])

  async function fetchComment() {
    if (!id) return
    const commentData = await API.graphql({ query: getComment, variables: { id }})
    setComment(commentData.data.getComment)
  }
    
  if (!comment) return null
   
  async function updateCurrentComment() {
    const { content, id } = comment
    if (!content) return
    
    const commentUpdated = {
      id, content
    }

    await API.graphql({
      query: updateComment,
      variables: { input: commentUpdated },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })

    navigate(`/userpostitem/${postId}`) 
  }

  return (
   <div className="container-fluid w-2/3 flex ml-40">
      <div class="bg-slate-700 opacity-90 container-fluid w-full flex flex-col  mt-10 py-4 px-8 rounded">
        <p className="text-xl text-white font-bold">Edit Comment</p>
        <div className="container-fluid flex bg-purple-700 w-full h-full justify-center px-4 my-5 rounded-sm"> 
          <div className="flex flex-col justify-center w-full">
            {/* <SimpleMDE value={comment.content} onChange={value => setComment({ ...comment, content: value })} /> */}
            <textarea
              value={comment.content}
              onChange={(e) => setComment({ ...comment, content: e.target.value })}
              className="border-b p-3 text-lg my-4 focus:outline-none w-full  h-64 font-light text-gray-500 placeholder-gray-500 rounded"
            />
            <div className="flex justify-end space-x-2 my-2">
              <button
                className="bg-slate-800 text-white font-semibold px-3 py-2 rounded hover:bg-slate-700 transition ease-in-out"
                onClick={updateCurrentComment}>Update Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditComment