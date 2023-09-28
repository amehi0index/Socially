
import { Link, } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa';
import Greeting from '../components/auth/signin/Greeting'

function Navbar({ uiState, setUiState, user, setUser }) {

  const clickHandler = () => {
    setUiState('signIn')
  }

  return (
    <nav className="relative w-full flex  items-center justify-between bg-gradient-to-r from-teal-700 to-teal-500 p-6">
      <div className="container-fluid w-full flex  items-center justify-between">
        <div className="container-fluid w-full flex justify-between">
          <div class="flex items-center flex-shrink-0 text-white mr-6">
            {uiState === ('signedIn') ?( <Link to="/allposts"> 
              <span class="font-semibold text-xl">NotReddit</span>
            </Link>) : (<Link><span class="font-semibold text-xl">NotReddit</span></Link>)}
          </div> 
            {
              uiState !== ('signedIn') && (
                <div className="cursor-pointer" onClick={clickHandler}>
                  <FaUserCircle size="24" className="text-white" />
                </div>
              )
            }
         
            {
              uiState === ('signedIn') && ( 
                <div className="flex w-full pl-10 items-center text-white justify-between font-Roboto font-semibold ">
                  <div>
                    <Link to="/userposts">
                      <span className="mr-6 cursor-pointer uppercase text-sm hover:text-slate-100 transition duration-200">My Posts</span>
                    </Link>
                      
                    <Link to="/createpost">
                      <span className="mr-6 cursor-pointer uppercase text-sm hover:text-slate-100">Create Post</span>
                      </Link>
                      
                    <Link to="/edituserprofile">
                      <span className="mr-6 cursor-pointer uppercase text-sm hover:text-slate-100">Profile</span>
                    </Link>
                  </div>
               
                  <Greeting user={user} setUser={setUser} setUiState={setUiState} />
                </div>
              )
            }
          </div>
        </div>
      </nav>
    )
  }
  
  export default Navbar
  