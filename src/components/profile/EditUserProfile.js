import { useState, useEffect, useRef , useLocation } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API, Auth, Storage } from 'aws-amplify'
import { updateUser, deleteUser, createUser } from '../../graphql/mutations'
import { getUser } from '../../graphql/queries'
import { v4 as uuid } from 'uuid'
import { FaUser, FaUserPlus } from 'react-icons/fa'

function EditUserProfile() {
  const [profile, setProfile] = useState(null)
  const [avatarImage, setAvatarImage] = useState(require('../../img/profile-user.png'))
  const [id, setId] = useState('')

  const [socialSigninEmail, setSocialSigninEmail] = useState('')
  const [socialSigninHandle, setSocialSigninHandle] = useState('')

  const [image, setImage] = useState(null)
  const hiddenFileInput = useRef(null)
  const [isSwitch, setIsSwitch] = useState(false)
  const [pronouns, setPronouns] = useState('')
    
  useEffect(() => {
    fetchUser()
  }, [id])
  
  let navigate = useNavigate()
    
  async function fetchUser() {
    const user = await Auth.currentUserInfo()
    console.log('user',user)

    if(user.username.includes('google')){
      console.log('googler')
      setSocialSigninEmail(user.attributes.email)
      setSocialSigninHandle(user.attributes.email)
    }

    setId(user.username)
    setProfileInfo()   
  }   
  
  async function setProfileInfo() {
    try {

      const profileData = await API.graphql({query: getUser, variables: {id}})
      console.log('pDataObj:', profileData.data.getUser)

      if (profileData.data.getUser === null || !profileData.data.getUser.id){

        const newProfile = {
          avatar: '',
          email: socialSigninEmail,
          handle: socialSigninHandle,
          pronouns: '',
          id,
        }
    
        const createProfile =   await API.graphql({
          query: createUser,
          variables: { input: newProfile }, 
          authMode: "AMAZON_COGNITO_USER_POOLS"
        })
        console.log('create profile', createProfile)
        setProfile(newProfile)
      }

      const { avatar, email, handle, pronouns } = profileData.data.getUser
         
      const userProfile = {
        avatar,
        email,
        handle,
        pronouns,
        id,
      }
      setProfile(userProfile)

      if (profile) {
        console.log('pfromUE:', profile)
        getAvatarImage()
      } 
      
    } catch (error) {
      console.log(error)
    }
  }

  async function getAvatarImage() {
    if (profile.avatar) {
      console.log('pfile:', profile)
      const imageKey = await Storage.get(profile.avatar)
      console.log(imageKey)
      setAvatarImage(imageKey)
    } else {
      console.log('no key')
    }
  }
 
  function onChange(e) {
    setProfile(() => ({ ...profile, [e.target.name]: e.target.value }))
  }
    
  async function updateUserProfile() {
    setProfile({...profile, id: id })
    profile.pronouns = pronouns

    if (image) {
      const fileName = `${image.name}_${uuid()}`
      // setProfile({...profile, avatar: fileName})
      profile.avatar = fileName
      await Storage.put(fileName, image)
    }

    console.log('profileBeforeUpdate:', profile)

    await API.graphql({
      query: updateUser,
      variables: { input: profile }, 
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    
    navigate('/userposts')
  }

  // async function deleteUserProfile() {
  //   console.log('delete his ass', id)
  //   await API.graphql({
  //     query: deleteUser,
  //     variables: {input: { id } },
  //     authMode: "AMAZON_COGNITO_USER_POOLS"
  //   })

  //   navigate('/')

  // }

  async function uploadImage() {
    hiddenFileInput.current.click()
    setIsSwitch(true)
  }

  function handleChange(e) {
    const fileUploaded = e.target.files[0]
    if (!fileUploaded) return
    setImage(fileUploaded)
    setIsSwitch(true) 
  }

  function getPronouns(value) {
    setPronouns(value)
    if(pronouns)
    console.log(pronouns)
  }
    
  return (
    <div className="container-fluid mx-auto w-1/3 flex ml-40">
      <div class="bg-slate-700 opacity-90 container-fluid  flex flex-col mt-10 py-4 px-8 rounded w-full max-w-md mx-auto">

        <p className="text-xl text-white font-bold">Profile</p>
        <div className="container-fluid flex bg-purple-700 w-full h-full justify-center px-4 my-5 rounded-sm"> 
          <div className="flex flex-col justify-center items-center w-full">
            

            {profile && (
              <>
                <input
                  name="handle"
                  readOnly
                  placeholder={profile.pronouns !== "" ? `${profile.handle} (${profile.pronouns})` : `${profile.handle}`}
                  // placeholder={`${profile.handle} (${profile.pronouns})` ?? `${profile.handle}`}
                  className="border-b text-sm mt-4 p-2 focus:outline-none w-full text-gray-500 rounded"
                /> 
                          
                <input
                  name="email"
                  readOnly
                  placeholder={profile.email}
                  className="border-b  text-sm my-4 p-2 focus:outline-none w-full text-gray-500 rounded"
                /> 
                          
                <select
                  name="pronouns"
                  onChange={(event) => getPronouns(event.target.value)}
                  value={pronouns}
                  className=" text-gray-900 text-sm p-2 focus:outline-none w-full rounded">
               
                    <option value="none">Preferred Pronouns</option>
                    <option value="She/Her/Hers">She/Her/Hers</option>
                    <option value="He/Him/His">He/Him/His</option>
                    <option value="They/Them/Theirs">They/Them/Theirs</option>
                    <option value="She/They">She/They</option>
                    <option value="He/They">He/They</option>
                </select>

            <div className="h-40 w-40 bg-gradient-to-r from-purple-600 to-purple-400 opacity-60 my-4 p-4 rounded flex self-center items-center justify-center relative">  
              <img src={image ? URL.createObjectURL(image) : avatarImage} className="my-4 h-24 w-24" />
               
              <button className="absolute top-2 right-2 p-2 rounded-full bg-gray-600 hover:bg-gray-500 ease-in-out duration-300" onClick={uploadImage}>
                <FaUserPlus />
              </button>

            </div> 
           
                <input
                  type="file"
                  ref={hiddenFileInput}
                  className="absolute w-0 h-0"
                  onChange={handleChange}
                />

                <div className="flex justify-between pb-3 mt-4">
                  {/* <button
                    className="bg-slate-800 text-white font-semibold px-4 py-2 rounded-sm hover:bg-slate-700 transition ease-in-out"
                    onClick={uploadImage}
                  >Upload Image
                  </button> */}

                  <button
                    type="button"
                    className="bg-slate-800 text-white font-semibold px-4 py-2 rounded-sm hover:bg-slate-700 transition ease-in-out"
                    onClick={updateUserProfile}
                  >Update Profile
                  </button>

                  {/* <button
                    type="button"
                    className="bg-slate-800 text-white font-semibold px-4 py-2 rounded-sm hover:bg-slate-700 transition ease-in-out"
                    onClick={deleteUserProfile}
                  >Delete Profile
                  </button> */}
                </div>
              </>
            )}           
          </div> 
        </div>
      </div>
    </div>    
  )
   
}

export default EditUserProfile