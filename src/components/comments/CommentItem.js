import React, { useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteComment as deleteCommentMutation } from '../../graphql/mutations'
import { getUser, listUsers } from '../../graphql/queries'

const CommentItem = ({ comment, postId }) => {

    const [username, setUsername] = useState('')
    const [commentAuthor, setCommentAuthor] = useState('')

    let navigate = useNavigate()

    useEffect(() => {
        fetchUserProfile()
    }, [])

    async function fetchUserProfile() {
        const user = await Auth.currentAuthenticatedUser()
        const id = comment.userID
        setUsername(user.username)

        const userData = await API.graphql({query: listUsers})
        console.log(userData)

        userData.data.listUsers.items.map(user => {
            if (user.id === id) {
            // const commentAuth = `${user.handle} (${user.pronouns})`  ?? user.handle
                const commentAuth = user.pronouns !== '' ? `${user.handle} (${user.pronouns})` : user.handle
                setCommentAuthor(commentAuth)
            }
        }) 
    }
   
    function getDate(isoStr) {
        let date = new Date(isoStr)
        const year = date.toLocaleString("default", { year: "numeric" })
        const month = date.toLocaleString("default", { month: "long" })
        const day = date.toLocaleString("default", { day: "2-digit" })
        const formattedDate = `${month} ${day}, ${year}`
        return formattedDate
    }
    
    async function deleteComment(id) {
        await API.graphql({
            query: deleteCommentMutation,
            variables: { input: { id } },
            authMode: "AMAZON_COGNITO_USER_POOLS"
    })
        //navigate(`/userpostitem/${postId}`)  
        navigate("/") 
    }

    return (
        <div className="cursor-pointer bg-slate-800 rounded mt-4 p-4">
            <p className="text-purple-300 mt-2 mb-2">{commentAuthor} says:</p>
            <p className="text-white mt-2 mb-2">{comment.content}</p>
            <p className="text-white mt-2 mb-2">Posted {getDate(comment.createdAt)}</p>
            <div  className="flex w-full items-end justify-end">
                {username === comment.owner && (
                    <div className="flex justify-end space-x-2">
                        <Link to={`/editcomment/${comment.id}`} state={postId} className="bg-slate-800 text-white font-semibold flex justify-center rounded hover:bg-slate-700 transition ease-in-out cursor-pointer w-16 py-1">
                            <span >Edit</span>
                        </Link>
                        <button
                            className="bg-slate-800 text-white font-semibold rounded flex justify-center hover:bg-slate-700 transition ease-in-out w-16 py-1"
                            onClick={() => deleteComment(comment.id)}
                        >Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentItem