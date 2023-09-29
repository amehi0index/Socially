import SocialSignIn from './SocialSignin'
import Input from '../../Input'

const Signin = ({ onChange, setUiState, signIn }) => {
  return (
    <div className="sm:w-540 py-9 px-12 rounded  flex flex-col">
      <p className="text-3xl font-black">Welcome Back!</p>

      <div className="mt-6">
        <Input onChange={onChange} name="email"  placeholder="Email"/>
      </div>

      <div className="mt-7 flex flex-col">
        <Input type="password" name="password" onChange={onChange} placeholder="Password" />
        <span
            onClick={() => setUiState('forgotPassword')}
            className="self-end text-teal-600 cursor-pointer"
          >Forgot your password?</span>
      </div>

      <button onClick={signIn} className="text-white w-full mt-6 bg-slate-800 hover:bg-slate-700 duration-300 p-3 rounded ease-in-out">
        Login
      </button>

      <div className="flex items-center  py-1 mt-6">
        <div class="w-[400px]  bg-gray-200 h-[1px]"></div>
      </div>

      <SocialSignIn />

      <p className="mt-6 pt-6 text-base font-light">
        Don't have an account?
        <span
          onClick={() => setUiState('signUp')}
          role="button"
          className="cursor-pointer text-teal-600 font-semibold"> Sign up here
        </span>
      </p>
    </div>
  )
}

export default Signin