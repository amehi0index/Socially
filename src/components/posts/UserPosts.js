import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { listPosts } from '../../graphql/queries'
import { deletePost as deletePostMutation } from '../../graphql/mutations'
import * as subscriptions from '../../graphql/subscriptions';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa'

const UserPosts = ({ user }) => {
  const [posts, setPosts] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    fetchPosts()

    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreatePost)
    ).subscribe({
      next: ({ provider, value }) => console.log({ provider, value }),
      error: (error) => console.warn(error)
    });

    subscription.unsubscribe()
  }, [])
    
  async function fetchPosts() {
      
    const { username } = await Auth.currentAuthenticatedUser()
    
    const postData = await API.graphql({
      query: listPosts
    })
   
    // console.log(postData)
    const userPostList = postData.data.listPosts.items.filter(item => item.owner === username)
      // console.log(userPostList)
    setPosts(userPostList)
  } 

  function handleEditPost(post) {
    navigate(`/editpost/${post.id}`)
  }

  async function deletePost(id) {
    console.log('postId', id)
    await API.graphql({
      query: deletePostMutation,
      variables: { input: { id } },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    fetchPosts()
  }
 
  return (
    <div className="container w-full flex">
    <div class="bg-slate-700 opacity-90 container-fluid w-full lg:w-2/3 flex flex-col  mt-10 py-4 px-8 rounded">
      <p className="text-xl text-white font-bold">My Posts</p>
      <div className="container-fluid flex bg-purple-700 w-full h-full justify-center rounded-sm my-2">  
          <div className="flex flex-col justify-center w-full">
            {
              posts.map((post, index) => (
                <div className="flex flex-col w-full cursor-pointer hover:bg-gradient-to-l from-purple-800 to-purple-700 transition ease-in-out">
                  <div key={index} className=	"mt-4 pb-3 px-4">
                    <h2 className="text-xl font-semibold w-5/6 truncate">{post.title}</h2>
          
                    <div className="flex space-x-2 justify-end">
                      {/* <Link to={`/editpost/${post.id}`} state={post} className="bg-slate-800 text-white text-sm py-1 px-2  rounded-sm cursor-pointer">
                        <FaEdit className="text-white" />
                      </Link> */}

                      <Link to={`/userpostitem/${post.id}`} state={post} className="bg-slate-800 text-white text-sm py-1 px-2 rounded-sm cursor-pointer">
                        <FaEye  className="text-white" />
                      </Link> 

                      <button onClick={()=>handleEditPost(post)} className="bg-slate-800 text-white text-sm py-1 px-2 rounded-sm cursor-pointer">
                        <FaEdit  className="text-white" />
                      </button>
                  
                      <button
                        className="bg-slate-800 text-white text-sm py-1 px-2 rounded-sm cursor-pointer"
                        onClick={() => deletePost(post.id)}
                      >
                        <FaTrash className="text-white" />
                      </button>
                    </div>
                  </div>
              </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPosts