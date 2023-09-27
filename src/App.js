import { useState, useEffect } from 'react'
import { Auth, Hub, API } from 'aws-amplify'
import AppRoutes from './routes/AppRoutes'


const initialState = { handle: '', email: '', avatar: ''}

function App() {
  const [uiState, setUiState] = useState(null)
  const [user, setUser] = useState(null)
  
  useEffect(()=> {
    checkUser()
    // setAuthListener()
    setUiState('signIn')
  }, [])

  async function checkUser(){
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log('user from app:', user)
      console.log('username from app:', user.username)
      const { email, nickname} = user.attributes
      setUser(()=> nickname ? nickname : email)
      setUiState('signedIn')
      } catch (error) {
        setUser(null)
      //setUiState('signIn')
    }
  }

  return (
    <AppRoutes
      user={user}
      setUser={setUser}
      checkUser={checkUser}
      uiState={uiState}
      setUiState={setUiState}
    />
  )
}

export default App