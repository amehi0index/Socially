import { useState, useEffect, useRef } from 'react'
import { API, Storage } from 'aws-amplify'
import { useNavigate, useParams } from 'react-router-dom'
// import SimpleMDE from "react-simplemde-editor"
// import "easymde/dist/easymde.min.css"
import { updatePost } from '../../graphql/mutations'
import {getPost} from '../../graphql/queries'
import { v4 as uuid } from 'uuid'

function EditPost() {

  const [post, setPost] = useState(null)
  const [postImage, setPostImage] = useState(null)
  const [localImage, setLocalImage] = useState(null)
  const hiddenFileInput = useRef(null)

  let { id } = useParams()
  let navigate = useNavigate()

  useEffect(() => {
    fetchPost()
  }, [id])

  async function fetchPost() {
    if (!id) return
    const postData = await API.graphql({query: getPost, variables: {id}})
    console.log('postData: ', postData)
    setPost(postData.data.getPost)  
    if (postData.data.getPost.coverImage) {
      getPostImage(postData.data.getPost.coverImage)
    }
  }

   async function getPostImage(postImage) {
    if (post && post.coverImage) {
      console.log('pfile:', post)
      const imageKey = await Storage.get(postImage)
      setPostImage(imageKey)
       
      // post.coverImage = imageKey
      console.log(imageKey)
    } else {
      console.log('no key')
    }
  }

  if (!post) return null
    
  function onChange(e) {
    setPost(() => ({ ...post, [e.target.name]: e.target.value }))
  }
    
  async function updateCurrentPost() {
    if(post){
      if (!post.title) return

      const postUpdated = {
        id: post.id, content: post.content, title: post.title
      }

      if (postImage && localImage) {
      const fileName = `${postImage.name}_${uuid()}`
      // setProfile({...profile, avatar: fileName})
      postUpdated.coverImage = fileName
      await Storage.put(fileName, postImage)
    }

      console.log('postBeforeUpdate:', post)
      await API.graphql({
        query: updatePost,
        variables: { input: postUpdated },
        authMode: "AMAZON_COGNITO_USER_POOLS"
      })
      navigate('/userposts')
    }
  }

  async function uploadImage() {
    hiddenFileInput.current.click()
  }

  function handleChange(e) {
    const fileUploaded = e.target.files[0]
   
    if (!fileUploaded) return
    setPostImage(fileUploaded)
    setLocalImage(URL.createObjectURL(fileUploaded))
  }

  return (
   <div className="container-fluid w-2/3 flex ml-40">
      <div class="bg-slate-700 opacity-90 container-fluid w-full lg:w-2/3 flex flex-col  mt-10 py-4 px-8 rounded">
        <p className="text-xl text-white font-bold">Edit Post</p>
        <div className="container-fluid flex bg-purple-700 w-full h-full justify-center px-4 my-5 rounded-sm"> 
          <div className="flex flex-col justify-center w-full">
            <input
              onChange={onChange}
              name="title"
              placeholder="Title"
              value={post.title}
              className="border-b pb-2 text-lg my-4 p-2 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2 rounded"
            /> 
            <div className="w-full h-72  my-3">
              {
                postImage && <img src={localImage ? localImage : postImage} className="p-1 w-full h-full object-cover" alt="Post Image" />
                // image && <img src={URL.createObjectURL(image)} className="p-1 w-full h-full object-cover" alt="Post Image"/>
              }
            </div>

             <input
                  type="file"
                  ref={hiddenFileInput}
                  className="absolute w-0 h-0"
                  onChange={handleChange}
             />

            {/* <SimpleMDE value={post.content} onChange={value => setPost({ ...post, content: value })} /> */}
            <textarea
              value={post.content}
              onChange={e => setPost({ ...post, content: e.target.value })}
              className="border-b p-2 text-lg my-4 focus:outline-none w-full  h-64 font-light text-gray-500 placeholder-gray-500 y-2 rounded"
            />

            <div className="flex flex-col md:flex-row pb-3">

              <button
                className="bg-slate-800 text-white font-semibold px-4 py-2 m-1 rounded-sm hover:bg-slate-700 transition ease-in-out"
                onClick={uploadImage}
              >Upload Image
              </button>

              <button
                className="bg-slate-800 text-white font-semibold px-4 py-2 m-1 rounded-sm hover:bg-slate-700 transition ease-in-out"
                onClick={updateCurrentPost}>
                Update Post
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPost 