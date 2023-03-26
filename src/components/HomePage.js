import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Task from "./Task";
import Header from "./Header";

function HomePage() {
  const navigate = useNavigate();

  useEffect( () => {
    const data = JSON.parse(localStorage.getItem("jwt"))
    if (!data) {
      navigate('/login')
    }
  })


  return (
    <div className="flex justify-between p-10">
      <Header />
      <Task/>
    </div>
  )
}

export default HomePage