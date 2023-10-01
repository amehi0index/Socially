
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { API, Storage, Auth } from 'aws-amplify'
import { v4 as uuid } from 'uuid'
// import SimpleMDE from "react-simplemde-editor"
// import "easymde/dist/easymde.min.css"
import { createPost } from '../../graphql/mutations'

const initialState = {title: '', content: '', coverImage: ''}

function CreatePost() {

  // let { id } = useParams() 
  const [id, setId] = useState('')
  const [post, setPost] = useState(initialState)
  const [image, setImage] = useState(null)
  const hiddenFileInput = useRef(null)
  
  const {title, content} = post
  
  useEffect(() => {
    fetchUserId()
  }, [id])

  let navigate = useNavigate()
    
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }
  
  async function fetchUserId() {
    const user = await Auth.currentUserInfo()
    setId(user.username)
  }

  async function createNewPost() {

    if (!title || !content) return

    const postId = uuid()
    post.id = postId
    post.userID = id
    // post.userId = id

    if (image) {
      const fileName = `${image.name}_${uuid()}`
      post.coverImage = fileName
      await Storage.put(fileName, image)
    }

    console.log(post)

    await API.graphql({
      query: createPost,
      variables: { input: post }, 
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    
    navigate('/userposts')
  }

  async function uploadImage() {
    hiddenFileInput.current.click()
  }

  function handleChange(e) {
    const fileUploaded = e.target.files[0]
   
    if (!fileUploaded) return
    setImage(fileUploaded)
  }
    
  return (
    <div className="container w-full flex">
      <div class="bg-slate-700 opacity-90 container-fluid w-full lg:w-2/3 flex flex-col  mt-10 py-4 px-8 rounded">
        <p className="text-xl text-white font-bold">Create A Post</p>
        <div className="container-fluid flex bg-purple-700 w-full h-full justify-center px-4 my-5 rounded-sm"> 
          <div className="flex flex-col justify-center w-full">
            <input
              onChange={onChange}
              name="title"
              placeholder="Title"
              value={post.title}
              className="border-b pb-2 text-lg my-4 p-2 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2 rounded"
            /> 
            {
              image && (
                <img src={URL.createObjectURL(image)} className="my-4 h-40 w-40"  alt="User's posted image"/>
              )
            }
            {/* <SimpleMDE value={post.content} onChange={value => setPost({ ...post, content: value })} /> */}
              <textarea
                value={post.content}
                onChange={(e) => setPost({ ...post, content: e.target.value })}
                className="border-b p-2 text-lg my-4 focus:outline-none w-full  h-64 font-light text-gray-500 placeholder-gray-500 y-2 rounded"
              />
            
            <input
              type="file"
              ref={hiddenFileInput}
              className="absolute w-0 h-0"
              onChange={handleChange}
            />

            <div className="flex flex-col md:flex-row pb-3">
              <button
                className="bg-slate-800 text-white font-semibold px-4 py-2 m-1 rounded-sm hover:bg-slate-700 transition ease-in-out"
                onClick={uploadImage}
              >Upload Image
              </button>
              <button
                type="button"
                className="bg-slate-800 text-white font-semibold px-4 py-2 m-1 rounded-sm hover:bg-slate-700 transition ease-in-out"
                onClick={createNewPost}
              >Create Post
              </button>
            </div>
          </div> 
        </div>
      </div>
    </div>    
  )
}

// export default withAuthenticator(CreatePost)
export default CreatePost