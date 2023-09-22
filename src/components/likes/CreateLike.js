import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { API, Auth } from 'aws-amplify'
// import SimpleMDE from "react-simplemde-editor"
// import "easymde/dist/easymde.min.css"
import { createPostLike } from '../../graphql/mutations'


function CreatePostLike() {  

    // useEffect(() => {
    //     fetchUserId()
    // }, [])

    const [like, setLike] = useState()
    // const [userId, setUserId] = useState('')
    
    let { id } = useParams()  //postId 

    // const { content } = comment

    let navigate = useNavigate();

    async function fetchUserId() {
      const {username} = await Auth.currentUserInfo()
      console.log(username)
        return username
    }
    
    async function createNewLike() {
        let userId = await fetchUserId()
        if (userId) {
            console.log(userId)
            if (!content) return
            await API.graphql({
                query: createPostLike,
                variables: {input: {content: content, postID: id, userID: userId}},
                authMode: "AMAZON_COGNITO_USER_POOLS"
            })
            navigate(`/userpostitem/${id}`)
        }
    }

    return (
        
     <></>
        
    )
}

export default CreatePostLike