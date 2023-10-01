
import Input from '../../Input'
import SocialSignIn from '../signin/SocialSignin'

const SignUp = ({ onChange, setUiState, signUp }) => {
  return (
    <div className="mt-6 mb-12 sm:w-full md:w-1/2 lg:w-1/3 mx-auto p-6 rounded bg-white shadow-lg">
    <p className="text-2xl sm:text-3xl font-black text-center mb-6">Join Now!</p>

      <div className="mt-6">
        <Input onChange={onChange} name="nickname" placeholder="Username"/>
      </div>

      <div className="mt-6">
        <Input onChange={onChange} name="email" placeholder="Email" />
      </div>

      <div className="mt-6 flex flex-col">
        <Input type="password" name="password" onChange={onChange} placeholder="Password"/>
        <span
            className="self-end text-teal-600 cursor-pointer"
          >(Minimum 8 Characters)</span>
      </div>

      <button onClick={signUp} className="text-white w-full mt-6 bg-slate-800 hover:bg-slate-700 duration-300 p-3 rounded ease-in-out">
       Sign Up
      </button>

      <div className="flex items-center mt-6 mb-4">
        <div className="flex-1 bg-gray-200 h-px"></div>
        <div className="mx-2 text-gray-500 text-sm">or</div>
        <div className="flex-1 bg-gray-200 h-px"></div>
      </div>

      <SocialSignIn />


      <p className="mt-4 text-center text-sm font-light pl-1">
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