import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Navbar from '../pages/Navbar'
import SignIn from '../components/auth/signin/SignIn'
import SignUp from '../components/auth/signup/SignUp'
import CreatePost from '../components/posts/CreatePost'
import UserPosts from '../components/posts/UserPosts'
import UserPostItem from '../components/posts/UserPostItem'
import EditPost from '../components/posts/EditPost'
import EditComment from '../components/comments/EditComment'
import UIOptions from '../pages/UIOptions'
import CreateComment from '../components/comments/CreateComment'
import EditUserProfile from '../components/profile/EditUserProfile'
import AllPosts from '../components/posts/AllPosts'


const AppRoutes = ({ user, setUser, checkUser, uiState, setUiState }) => {

  return (
    <Router>
      <Navbar
        uiState={uiState}
        setUiState={setUiState}
        user={user} setUser={setUser}
        checkUser={checkUser}
      />

      <UIOptions
        uiState={uiState}
        setUiState={setUiState}
        checkUser={checkUser}
        user={user}
      />

      <div className="container-fluid w-full flex p-7">      
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='signin' element={<SignIn/>}/>
          <Route path= 'signup' element={<SignUp/>}/>
          <Route path= 'edituserprofile' element={<EditUserProfile />}/>
          <Route path='createpost' element={<CreatePost />} />
          <Route path='userposts' element={<UserPosts />} />
          <Route path='userpostitem/:id' element={<UserPostItem />} />
          <Route path='editpost/:id' element={<EditPost />} />
          <Route path='editpost' element={<EditPost />} />
          <Route path='editcomment/:id' element={<EditComment />} />
          <Route path='editcomment' element={<EditComment />} /> 
          <Route path='createcomment/:id' element={<CreateComment />} /> 
          <Route path='allposts' element={<AllPosts />} /> 
        </Routes> 
      </div> 
   

    </Router>
  )
}

export default AppRoutes