import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Auth } from 'aws-amplify'

function SocialSignIn() {
  return (
    <div className="flex">
      <div className="flex justify-between w-2/5">
        <button className="mt-4 mx-1 focus:outline-none" onClick={() => Auth.federatedSignIn({ provider: 'Google' })}>
            <FaGoogle size="40" className="bg-slate-800 hover:bg-slate-700 duration-300 rounded-full text-white p-3"/>
        </button>
        <button className="mt-4 mx-1 focus:outline-none bg-slate-800 hover:bg-slate-700 duration-300 rounded-full text-white p-3" onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
            <FaFacebook size=""/>
        </button>
        <button className="mt-4 mx-1 focus:outline-none bg-slate-800 rounded-full hover:bg-slate-700 ease-in-out duration-300 text-white p-3" onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
            <FaFacebook size=""/>
        </button>
      </div>
    </div>
  )
}

export default SocialSignIn