import { useState, useEffect } from 'react'
import {  API, graphqlOperation } from 'aws-amplify'
import { listComments } from '../../graphql/queries'
import CommentItem from './CommentItem'

const Comments = ({ postId }) => {

  const [comments, setComments] = useState([])
    
  useEffect(() => {
    fetchComments()
  }, [])
  
  async function fetchComments() {
    const commentData = await API.graphql(
      graphqlOperation(listComments, {filter: {postID: {eq: postId}}}))
    console.log(commentData)
    setComments(commentData.data.listComments.items)
  }

  return (
    <div className="container-fluid w-full flex px-6">
      <div class="container-fluid w-full flex flex-col  mt-10 py-4 px-8 rounded">
        <p className="text-xl text-white font-bold">Comments</p>
        {
          comments.map((comment, index) => (
            <CommentItem key={index} comment={comment} postId={postId} />
          ))
        }
      </div>   
    </div>   
  )
}

export default Comments