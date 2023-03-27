import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Task from "./Task";
import Header from "./Header";
import { UserContext } from '../context/context'

function HomePage() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("jwt"))

  useEffect( () => {
    if (!data) {
      navigate('/login')
    }

  })


  return (
    <UserContext.Provider value={data.user}>
      <div className="flex justify-between p-10">
        <Header />
        <Task/>
      </div>
    </UserContext.Provider>
  )
}

export default HomePage