
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
// import SimpleMDE from "react-simplemde-editor"
// import "easymde/dist/easymde.min.css"
import { createComment } from '../../graphql/mutations'

const initialState = { content: '' }

function CreateComment() {  

    // useEffect(() => {
    //     fetchUserId()
    // }, [])

    const [comment, setComment] = useState(initialState)
    // const [userId, setUserId] = useState('')
    
    let { id } = useParams()  //postId from Comments <- UserPostItem
    const { content } = comment

    let navigate = useNavigate();

    async function fetchUserId() {
      const {username} = await Auth.currentUserInfo()
      console.log(username)
      return username
        // console.log(id)
        // setUserId(user.username)
    }
    
    async function createNewComment() {
        let userId = await fetchUserId()
        if (userId) {
            // console.log(userId)
            if (!content) return
            await API.graphql({
                query: createComment,
                variables: {input: {content: content, postID: id, userID: userId}},
                authMode: "AMAZON_COGNITO_USER_POOLS"
            })
            navigate(`/userpostitem/${id}`)
        }
    }

    return (
        <div className="container-fluid w-2/3 flex ml-40">
            <div class="bg-slate-700 opacity-90 container-fluid w-full flex flex-col  mt-10 py-4 px-8 rounded">
                <p className="text-xl text-white font-bold">Create Comment</p>
                <div className="container-fluid flex bg-purple-700 w-full h-full justify-center px-4 my-5 rounded-sm"> 
                    <div className="flex flex-col justify-center w-full">
                            
                        {/* <SimpleMDE value={comment.content} onChange={value => setComment({ ...comment, content: value })} />
                         */}
                       
                        <textarea
                            value={comment.content}
                            onChange={(e)=> setComment({ ...comment, content: e.target.value })}
                            className="border-b p-3 text-lg my-4 focus:outline-none w-full  h-full font-light text-gray-500 placeholder-gray-500 rounded"
                        />
                        <div className="flex justify-end space-x-2 my-2">
                            <button
                                type="button"
                                className="bg-slate-800 text-white font-semibold px-3 py-2 rounded hover:bg-slate-700 transition ease-in-out"
                                onClick={createNewComment}
                                >Add Comment
                            </button>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        
    )
}

export default CreateComment