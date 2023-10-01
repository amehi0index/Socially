import SocialSignIn from './SocialSignin'
import Input from '../../Input'

const Signin = ({ onChange, setUiState, signIn }) => {
  return (
    <div className="mt-6 mb-12 sm:w-full md:w-1/2 lg:w-1/3 mx-auto p-6 rounded bg-white shadow-lg">
      <p className="text-2xl sm:text-3xl font-black text-center mb-6">Welcome Back!</p>

      <div className="mb-6">
        <Input onChange={onChange} name="email" placeholder="Email" />
      </div>

      <div className="mb-6">
        <Input type="password" name="password" onChange={onChange} placeholder="Password" />
        <span
          onClick={() => setUiState('forgotPassword')}
          className="text-teal-600 text-sm cursor-pointer block mt-2 text-right"
        >Forgot your password?</span>
      </div>

      <button onClick={signIn} className="text-white w-full  bg-slate-800 hover:bg-slate-700 duration-300 p-3 rounded">
        Login
      </button>

      <div className="flex items-center mt-6 mb-4">
        <div className="flex-1 bg-gray-200 h-px"></div>
        <div className="mx-2 text-gray-500 text-sm">or</div>
        <div className="flex-1 bg-gray-200 h-px"></div>
      </div>

      <SocialSignIn />

      <p className="mt-4 text-center text-sm font-light">
        Don't have an account?
        <span
          onClick={() => setUiState('signUp')}
          role="button"
          className="cursor-pointer text-teal-600 font-semibold pl-1"
        >
          Sign up here
        </span>
      </p>
    </div>
  )
}

export default Signin