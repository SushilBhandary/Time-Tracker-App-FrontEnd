import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from "./api";
import { useNavigate } from "react-router-dom";

const Signup = () =>{

  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState("")
  const navigate = useNavigate();

  const submit = async(e) => {
    e.preventDefault()
    if (!(name && email && password)) {
      return toast.warn('Please Enter all fields', {
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
    if (!(password === rePassword)) {
      return toast.warn('Password does not match. Re-Enter the password', {
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
    if (!(password.length > 8)) {
      return toast.warn('Password should be greater than 8 character ', {
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
      name : name, 
      email : email, 
      password : password
    }
    await axios.post(`${API}/api/auth/signup`,data)
    .then( (res, err) => {
      if (res) {
        toast.success('User Created Successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          setName('')
          setEmail('')
          setPassword('')
          setRePassword('')
          setTimeout(function(){
            navigate("/login")
         }, 4000);
      }
    })
    .catch(e => toast.error(e.response.data.error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      }))
    
  }

  return(
    <div className="flex items-center justify-center h-screen  bg-gradient-to-r from-pink-500 to-yellow-500">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl  bg-gradient-to-r from-amber-200 to-yellow-500">
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
          <form action="" className="space-y-6 ng-untouched ng-pristine ng-valid">
            <div className="space-y-1 text-sm">
                <label className="block ">Name</label>
                <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" placeholder="Name" className="w-full px-4 py-3 rounded-md  border-2 " />
            </div>
            <div className="space-y-1 text-sm">
                <label className="block ">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="emali" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md border-2 " />
            </div>
        <div className="space-y-1 text-sm">
                <label className="block ">Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-2 " />
            </div>
        <div className="space-y-1 text-sm">
                <label className="block d">Re-enter Password</label>
                <input value={rePassword} onChange={e => setRePassword(e.target.value)} type="password" name="repassword" id="repassword" placeholder="Password" className="w-full px-4 py-3 rounded-md border-2 " />
            </div>
            <button onClick={submit} className="block w-full p-3 text-center rounded-sm text-white focus:outline-none  bg-blue-400  hover:bg-blue-500 rounded ">Sign up</button>
          </form>
        <p className="text-xs text-center sm:px-6 d">Already have a account ?
            <span className="underline text-blue-600" onClick={() => {navigate("/login")}} > Login</span>
        </p>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup