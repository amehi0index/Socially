import { useState, useEffect } from 'react'
import { Auth, API } from 'aws-amplify'
import SignIn from '../components/auth/signin/SignIn'
import SignUp from '../components/auth/signup/SignUp'

import ConfirmSignUp from '../components/auth/signup/ConfirmSignUp'
import ForgotPassword from '../components/auth/signin/ForgotPassword'
import ForgotPasswordSubmit from '../components/auth/signin/ForgotPasswordSubmit'
import { createUser } from '../graphql/mutations'

const initialState = { handle: '', email: '', avatar: ''}

const UIOptions = ({ uiState, setUiState, checkUser, user }) => {
    const [formState, setFormState] = useState({
    email: '', nickname: '', password: '', authCode: ''
    })

    const [profile, setProfile] = useState(initialState)
    const { email, nickname, password, authCode } = formState
    
    function onChange(e) {
        setFormState({...formState, [e.target.name] : e.target.value })
    }

    async function signIn() {
        try {
            await Auth.signIn(email, password) 
            checkUser()
            setUiState('signedIn')
        } catch (error) {
            console.log('error signing in', error);
        }
    }

    async function signUp() {
        try {
            const { user } = await Auth.signUp({
              username : email,
              password,
              attributes: {
                email,
                nickname,
            }
          })
        //   console.log(user)
          setUiState('confirmSignUp')
        } catch (error) {
          console.log('error signing up:', error)
        }
    }

    async function confirmSignUp() {
        try {
            await await Auth.confirmSignUp(email, authCode)
            await Auth.signIn(email, password)
            setUiState('signedIn')
            checkUser()
            createUserProfile()
        } catch (err) { console.log({ err })}
  
    }

    async function forgotPassword() {
      try {
          await Auth.forgotPassword(email) //username
          setUiState('forgotPasswordSubmit')
      } catch (error) {
          console.log({error})
      }
  }

  async function forgotPasswordSubmit() {
      try {
          await Auth.forgotPasswordSubmit(email, authCode, password)
          setUiState('signIn')
      } catch (error) {
          console.log({error})
      }
    }
    
  async function createUserProfile() {

      const user = await Auth.currentUserInfo()
      console.log('USER:', user)

      console.log('email:', user.attributes.email)
      console.log('username:', user.username)
     
    //   setProfile({
    //     ...profile, email: user.attributes.email,
    //     handle: user.attributes.nickname ? user.attributes.nickname : user.attributes.email
    //   })
    
      profile.id = user.username
      profile.email = user.attributes.email
      profile.handle = user.attributes.nickname ? user.attributes.nickname : user.attributes.email
    
    if (profile) {
      console.log('profile', profile)
    }
    
      await API.graphql({
        query: createUser,
        variables: {input: profile},
        authMode: "AMAZON_COGNITO_USER_POOLS"
      })
  }
    return (
        <>
            {   uiState !== 'signedIn' &&
                (
                    <>
                        {
                            uiState === 'signUp' && (
                                <SignUp onChange={onChange} setUiState={setUiState} signUp={signUp} />
                            )
                        }
                        
                        {
                            uiState === 'confirmSignUp' && (
                                <ConfirmSignUp onChange={onChange} setUiState={setUiState} confirmSignUp={confirmSignUp} />
                            )
                        }
                        {
                            uiState === 'signIn' && (
                                <SignIn onChange={onChange} setUiState={setUiState} signIn={signIn} />
                            )
                        }
                        {
                            uiState === 'forgotPassword' && (
                                <ForgotPassword onChange={onChange} setUiState={setUiState} forgotPassword={forgotPassword} />
                            )
                        }
                        {
                            uiState === 'forgotPasswordSubmit' && (
                                <ForgotPasswordSubmit onChange={onChange} forgotPasswordSubmit={forgotPasswordSubmit} />
                            )
                        } 
                    </>
                )
            }
        </>
    )
}

export default UIOptions