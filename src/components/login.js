import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

import API from "./api";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const submit = async(e) => {
    e.preventDefault()
    if (!(email && password)) {
      return toast.warn('Email/Password is missining', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    const data = {
      email : email, 
      password : password
    }
    await axios.post(`${API}/api/auth/login`,data)
    .then(async(res) => {
      localStorage.setItem("jwt", JSON.stringify(res.data))
      navigate('/home')
    })
    .catch( e => 
      toast.error(e.response.data.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
      )
  }

  return(
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-500 to-yellow-500">
        <div className="md:w-full w-[90%] max-w-md p-8 space-y-3 rounded-xl bg-gradient-to-r from-amber-200 to-yellow-500">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
            <div className="space-y-1 text-sm">
                <label className="block ">Email</label>
                <input value={email} onChange={ e =>setEmail(e.target.value)} type="text" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md  border-2 " />
            </div>
            <div className="space-y-1 text-sm">
                <label className="block ">Password</label>
                <input value={password} onChange={ e =>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-2 " />
            </div>
            <button onClick={submit} className="block w-full p-3 text-center rounded-sm text-white bg-blue-400 focus:outline-none hover:bg-blue-500 rounded ">Login</button>
        </form>
        <p className="text-xs text-center sm:px-6 ">Don't have an account?
            <span className="underline text-blue-600" onClick={() => {navigate("/signup")}}> Sign up</span>
        </p>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Login