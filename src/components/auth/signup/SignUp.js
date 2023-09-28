
import Input from '../../Input'
import SocialSignIn from '../signin/SocialSignin'

const SignUp = ({ onChange, setUiState, signUp }) => {
  return (
    <div className="sm:w-540 mt-12 bg-white py-9 px-12 rounded shadow-lg flex flex-col">
    <p className="text-3xl font-black">Join Now!</p>

      <div className="mt-4">
        <Input onChange={onChange} name="nickname" placeholder="Username"/>
      </div>

      <div className="mt-4">
        <Input onChange={onChange} name="email" placeholder="Email" />
      </div>

      <div className="mt-4 flex flex-col">
        <Input type="password" name="password" onChange={onChange} placeholder="Password"/>
        <span
            className="ml-8 sm:ml-48 text-teal-500 cursor-pointer"
          >(Minimum 8 Characters)</span>
      </div>

      <button onClick={signUp} className="text-white w-full mt-6 bg-slate-800 hover:bg-slate-700 duration-300 p-3 rounded ease-in-out">
       Sign Up
      </button>

      <div className="flex items-center  py-1 mt-6">
        <div class="w-[400px]  bg-gray-200 h-[1px]"></div>
      </div>

      <SocialSignIn />


      <p className="mt-6 text-base font-light">
        Already have an account?
        <span
          onClick={() => setUiState('signIn')}
          role="button"
          className="cursor-pointer text-teal-600 font-semibold"> Sign In</span>
      </p>
    </div>    
  )
}

export default SignUp