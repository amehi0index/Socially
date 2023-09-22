import { useState, useEffect } from 'react'
import { Link }from 'react-router-dom'
import { API, Storage, graphqlOperation } from 'aws-amplify'
import { listPosts } from '../../graphql/queries'
import { getUser } from '../../graphql/queries'
import { listComments, listPostLikes } from '../../graphql/queries'
import * as subscriptions from '../../graphql/subscriptions';
import { FaComment, FaHeart } from 'react-icons/fa'
import defaultAvatar from '../../img/user.png'

const AllPosts = () => {
  const [posts, setPosts] = useState([])
  const [defaultImage, setDefaultImage] = useState(defaultAvatar)
  const [feature, setFeature] = useState(null)

  useEffect(() => {
    fetchPosts()

    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreatePost)
    ).subscribe({
      next: ({ provider, value }) => console.log({ provider, value }),
      error: (error) => console.warn(error)
    });

      // API.graphql({
      //   query: onCreateByPostId,
      //   variables: {
      //    postId: id
      //   }
      // }) 

    return ()=> subscription.unsubscribe()
  }, [])
  
  async function fetchPosts() {

    const postData = await API.graphql({ query: listPosts })
    const { items } = postData.data.listPosts

    const postsWithImages = await Promise.all(items.map(async post => {

      if (post.coverImage) {
        post.coverImage = await Storage.get(post.coverImage)
      }
     
      if (post.userID) {
        //Get user avatar and handle from DB
        const id = post.userID
        const profileData = await API.graphql({
          query: getUser,
          variables: {id}
        })

        if (profileData.data.getUser) {
          //   const { avatar, handle } = profileData.data.getUser
          let avatar = profileData.data.getUser.avatar
          let handle = profileData.data.getUser.handle
      
          //Get user avatar from s3/storage
          if (avatar !== null) {
            const imageKey = await Storage.get(avatar)
            post.userAvatar = imageKey
            post.userHandle = handle
          }else {
            console.log('no key')
            post.userAvatar = defaultImage
          }  
        }
      }
        
      //Get the post comments from DB
      const commentData = await API.graphql(graphqlOperation(
        listComments,
        {filter: {postID: {eq: post.id}}}
      ))
      post.postComments = commentData.data.listComments.items.length

      //Get post likes
      const postLikes = await API.graphql(graphqlOperation(
        listPostLikes,
        {filter: {postID: {eq: post.id}}}
      ))
      post.likes = postLikes.data.listPostLikes.items.length
      
      return post
    }))

    if (postsWithImages) {
      const feat = postsWithImages[postsWithImages.length-1]
      setFeature(feat)
    }
    // setPosts(postData.data.listPosts.items)
    setPosts( postsWithImages)
  }

  function getDate(isoStr) {
    let date = new Date(isoStr)
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.toLocaleString("default", { day: "2-digit" });
    const formattedDate = `${month} ${day}, ${year}`
    return formattedDate
  }

  return (
    <div className="container-fluid w-full md:w-2/3 flex">
      <div class="bg-slate-700 opacity-90 container-fluid w-full flex flex-col mt-10 py-4 px-8 rounded self-start">
        <p className="text-xl text-white font-bold">Latest Posts</p>
        <div className="container-fluid flex bg-purple-800 w-full h-full md:px-4 my-5 rounded-sm">

          <div className="flex flex-col w-full px-3 md:px-8 py-2 md:py-6">
            {
              posts.map((post, index) => (
                <Link key={index} to={`/userpostitem/${post.id}`} className="flex flex-col w-full h-full py-1">

                  <div className="flex p-3 w-full h-full rounded bg-gradient-to-l from-purple-900 to-purple-700">
                    
                    <div className="w-14 h-14 rounded-full bg-purple-500 opacity-80 flex items-center justify-center">
                      {
                        (post.userAvatar && <img src={post.userAvatar} className="object-cover w-12 h-12 rounded-full" />)
                      }
                    </div>
                      
                    {/* content */}
                    <div className="w-full h-32 flex">
                      <div className="w-full md:w-4/5 px-4 mr-3 flex flex-col">
                        <div className="cursor-pointer w-full flex justify-between text-xs md:text-sm text-purple-200">
                          <p>Posted by {post.userHandle}</p>  
                          <p>{ getDate(post.createdAt) }</p>
                        </div>
                        <h2 className="text:xs md:text-lg leading-tight md:leading-normal font-semibold mt-1 mb-2">{post.title}</h2> 
                        <div className="mt-auto flex w-1/2 flex space-x-5 text-xs md:text-sm">
                          <span className="flex items-center space-x-1  text-purple-300 bg-slate-800 px-2 py-1 rounded">
                            <FaComment />
                            <p className="px-1">{post.postComments}</p>
                          </span>
                          <span className="flex items-center space-x-1 text-purple-300 bg-slate-800 px-2 py-1 rounded">
                            <FaHeart className="text-red-600" />
                            <p className="px-1">{post.likes}</p>
                          </span>
                        </div> 
                      </div>

                      <div className="hidden md:flex h-32 w-1/5 bg-purple-800">
                        {
                          post.coverImage && <img src={post.coverImage} className="object-cover mx-auto h-full rounded p-2"/>
                        }
                      </div>
                    </div>

                  </div> 
                 
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>   
  )
}

export default AllPosts