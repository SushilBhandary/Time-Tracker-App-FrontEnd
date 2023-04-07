import { UserContext } from '../context/context'
import {useContext, useState} from "react"
import axios from "axios"
import API from "./api"
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Header = ({onDate, setOnDate}) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = async(e) => {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("jwt"))
    await axios.post(`${API}/api/auth/logout`, {}, {
      headers: {
        authorization: data.token
      }
    })
    .then( res => {
      localStorage.removeItem("jwt");
      navigate('/')
    })
    .catch( e => console.log("error --->", e))
  }

  const closeModal = (e) => {
    e.preventDefault()
    setOpen(false)
  };

  const changeDate = (e) => {
    e.preventDefault()
  }

  return (
    <div className="bg-cyan-500 w-[25vw] h-[90vh] rounded-lg flex flex-col justify-around items-center text-2xl">
        <div>
          <div class="relative md:w-36 md:h-36 w-12 h-12 bg-gradient-to-r from-[#833ab4] to-[#1dc0fd] rounded-full flex justify-center items-center text-center p-5 shadow-xl mr-4 md:text-4xl  text-xl text-white ">
            {user.name}
          </div>
          <h1 className="text-center"> UserName </h1>
        </div>
        <button className="py-3 px-5 bg-blue-500 rounded-lg" onClick={e => setOpen(!open) }>Change Date</button>
        <button className="py-3 px-5 bg-blue-500 rounded-lg">Report Genrate</button>
        <button className="py-3 px-5 bg-blue-500 rounded-lg" onClick={e => logout(e)}>LogOut</button>
        <Popup open={open}  modal nested>
          <form className=" text-lg container p-8 space-y-6 rounded-md shadow  bg-gradient-to-r from-[#833ab4] to-[#1dc0fd] ">
              <button className="btn btn-circle absolute  top-0 right-0 mt-2 mr-2"  onClick={closeModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h2 className="w-full text-3xl font-bold leading-tight">Edit Date</h2>
              <div>
                  <label className="block mb-1 ml-1">Select Date</label>
                  <input type="date"  className="block w-full p-2 rounded border-2 bg-[#8de0ff]"  onChange={e => setOnDate(e.target.value)}/ >
              </div>
              <div className="text-right">
                  <button onClick={e => changeDate(e)}  className=" px-4 py-2 font-bold rounded shadow text-white bg-blue-500 focus:outline-none hover:bg-blue-600 ">Change Date</button>
              </div>
          </form>
        </Popup>
      </div>
  )
}

export default Header