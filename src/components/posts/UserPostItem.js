import { API, Auth, Storage } from 'aws-amplify'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import {getPost, listPostLikes, getUser} from '../../graphql/queries'
import { createPostLike, deletePostLike } from '../../graphql/mutations'
import Comments from '../comments/Comments'
import { FaComment, FaHeart } from 'react-icons/fa'

export default function Post() {

    const [post, setPost] = useState(null)
    const [coverImage, setCoverImage] = useState(null)
    const [user, setUser] = useState('')
    const [images, setImages] = useState(null)

    const [isPostLike, setIsPostLike] = useState(false)
    const [userLike, setUserLike] = useState(null)
    let { id } = useParams()

    useEffect(() => {
        fetchPost()
        fetchUser()
    }, [])

    useEffect(() => {
        getCoverImage()
    }, [])

    async function fetchUser() {
        const { username } = await Auth.currentAuthenticatedUser()
        setUser(username)
         
        const allPostLikes =  await API.graphql({
            query: listPostLikes,
            variables: {filter: {postID: {eq:id}}}
        })
         
        // console.log(allPostLikes.data.listPostLikes.items)
         
        allPostLikes.data.listPostLikes.items.map(pl => {
            if (pl.userID === username) {
                setIsPostLike(true)
                // console.log('pl', pl)
            }
        })
    } 

    async function getCoverImage() {
        if (post && post.coverImage) {
            const imageKey = await Storage.get(post.coverImage)
            console.log(imageKey)
            setCoverImage(imageKey)
        } else {
            console.log('no key')
        }
    }

    async function fetchPost() {
        if (!id) return
        const postData = await API.graphql({query: getPost, variables: {id}})
        console.log('postData: ', postData)
        setPost(postData.data.getPost)  
    }   

    if (!post) return null

    async function handlePostLikes() {

        setIsPostLike(!isPostLike)

        if (user && id !== null) {
        
            if (!isPostLike) {
                console.log("I LIKE IT")
                const newLike = await API.graphql({
                    query: createPostLike,
                    variables: {input: {userID: user, postID: id}},
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                })
                console.log('newLike:', newLike)
                setUserLike(newLike.data.createPostLike)
            } else {
                console.log("DELETE DELETE DELETE")
                await API.graphql({
                    query: deletePostLike,
                    variables: {condition: {postID: {eq: id}}, input: {id: userLike.id}},
                    authMode: "AMAZON_COGNITO_USER_POOLS"
                })
            }

            const allPostLikes = await API.graphql({
                query: listPostLikes,
                variables: {filter: {postID: {eq: id}}}
            })

            console.log('allLikes:', allPostLikes)
        }
    }
 
    return ( 
        <div className="container-fluid w-2/3 flex ml-40">
            <div class="bg-slate-700 opacity-90 container-fluid w-full flex flex-col  mt-10 py-4 px-8 rounded">
                <div className="container-fluid  bg-purple-700 w-full h-full px-4 pb-7 my-5 rounded-sm flex flex-col"> 
                    {/* <div class="bg-slate-700 opacity-90 flex flex-col mx-6 mt-8 py-4 px-8 rounded"> */}
                    <div className="flex flex-col mx-6 mt-8 py-4 px-8 rounded">
                        <h1 className="text-xl mt-4 text-white font-semibold tracking-wide">{post.title}</h1>
                        <div className="w-full h-72 bg-slate-800 my-3">
                            {
                            coverImage && <img src={coverImage} className="p-1 w-full h-full object-cover" alt="Post Image" />
                            }
                        </div>
                        {/* <p className="text-sm font-light my-2">{post.owner}</p> */}
                        <div className="text-white rounded-sm flex flex-col items-center">
                            <ReactMarkdown children={post.content} />
                        </div>

                        { user && (
                            <div className="flex justify-end space-x-2 my-2">

                                <div onClick={handlePostLikes}
                                    className="bg-slate-900  font-semibold flex items-center justify-center px-3 py-2 rounded hover:bg-slate-800 transition ease-in-out"
                                >
                                    <FaHeart className={isPostLike ? `text-red-700`: `text-white`} />
                                </div>

                                <Link to={`/createcomment/${post.id}`} className="bg-slate-900 font-semibold flex items-center justify-center px-3 py-2  text-white rounded hover:bg-slate-800 transition ease-in-out" state={post.id}
                                >
                                    <FaComment/><span className="px-1 ">Add Comment</span>
                                </Link>
                            </div>
                        )}

                    </div>
                    <Comments postId={post.id}  />
                </div>
            </div>
        </div>
    )
}