import { useEffect, useState } from "react"
import axios from "axios"
import API from "./api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const Task = ({onDate}) => {

  let call = true
  const [taskData, setTaskData] = useState()
  const [action, setAction] = useState([])
  const [date, setDate] = useState()
  const [open, setOpen] = useState(false);
  const [feel, setFeel] = useState(true)
  const [why, setWhy] = useState('')

  useEffect( () => {
    const dateUpdateAction = async() => {
      if (call) {
        call = false
        const data = JSON.parse(localStorage.getItem("jwt"))
        await axios.post(`${API}/api/createTask`, {
          date : onDate
        }, {
          headers: {
            authorization: data.token
          }
        })
        .then(async(res) => {
          setTaskData(res.data.task)
          setAction(res.data.task.action)
          setDate(res.data.date)
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
    }
    dateUpdateAction()
  }, [onDate])

  const closeModal = (e) => {
    e.preventDefault()
    setOpen(false)
  };

  const updateUrgent = (v, id) => {
    taskData.action = taskData.action.map( e => {
      if (e._id !== id) {
        return e
      }
      e.Urgent = v === 'Yes'? true : false
      return e
    }) 
    setAction(taskData.action)
    setTaskData(taskData)
  }

  const updateImportant = (v, id) => {
    taskData.action = taskData.action.map( e => {
      if (e._id !== id) {
        return e
      }
      e.Important = v === 'Yes'? true : false
      return e
    }) 
    setAction(taskData.action)
    setTaskData(taskData)
  }

  const updateDescription = (v, id) => {
    taskData.action = taskData.action.map( e => {
      
      if (e._id !== id) {
        return e
      }
      e.description = v
      return e
    }) 
    setAction(taskData.action)
    setTaskData(taskData)
  }

  const save  = async(e) => {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("jwt"))
    await axios.put(`${API}/api/updateAction/${taskData._id}`, {
      action
    }, {
      headers: {
        authorization: data.token
      }
    })
    .then(async(res) => {
      setTaskData(res.data.task)
      setAction(res.data.task.action)
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

  const saveDescription = async(e) => {
    e.preventDefault()
    const data = JSON.parse(localStorage.getItem("jwt"))
    await axios.put(`${API}/api/updatetask/${taskData._id}`, {
      why,
      feel
    }, {
      headers: {
        authorization: data.token
      }
    })
    .then(async(res) => {
      setTaskData(res.data.task)
      setAction(res.data.task.action)
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

  return (
    <div className="bg-red-600 w-[70vw] h-[90vh] rounded-lg p-10">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl text-white mb-5">Task with Time</h1>
          <h1 className="text-3xl text-white mb-5"> Date : {date}</h1>
        </div>
        <div className="flex flex-col justify-around">
          <button className="py-2 px-5 bg-green-500 rounded-lg h-[50px] w-[180px]" onClick={e => save(e)} >Save</button>
          <button className="py-2 px-5 bg-green-500 rounded-lg h-[50px] w-[180px]" onClick={e => {e.preventDefault(); setOpen(true)}} >Update Description</button>
        </div>
      </div>
      <div className="bg-rose-400 h-[85%] overflow-auto p-10 rounded-lg">
        { taskData ? (
          action.map(e =>
            (
              <div key={e._id}>
                <div className="bg-rose-300 p-10 rounded-lg text-2xl text-slate-400 mb-5">
                  <div className=" flex justify-between mb-5">
                    <div className="text-center">
                      <h1 className="mb-2">Task Name</h1>
                      <input type="text" className=" w-[500px] h-[50px] rounded-lg px-3" value={e.description} onChange={ev => updateDescription(ev.target.value,e._id)}/>
                    </div >
                    <div className="text-center">
                      <h1 className="mb-2">From</h1>
                      <h2 className="py-3 px-5 bg-blue-500 rounded-lg">{e.startTime}:00</h2>
                    </div>
                    <div className="text-center">
                      <h1 className="mb-2">To</h1>
                      <h2 className="py-3 px-5 bg-blue-500 rounded-lg">{e.endTime}:00</h2>
                    </div>
                  </div>
                  <div className="flex justify-around">
                    <div className="text-center">
                      <h1 className="mb-2">Urgent</h1>
                      <select name="Urgent" className="w-[75px] h-[50px] rounded-lg px-2" value={e.Urgent? 'Yes' : 'No'} onChange={ev => updateUrgent(ev.target.value,e._id)}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <div className="text-center">
                      <h1 className="mb-2">Important</h1>
                      <select name="Important" className="w-[75px] h-[50px] rounded-lg px-2" value={e.Important? 'Yes' : 'No'} onChange={ev => updateImportant(ev.target.value,e._id)}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
                
            ))
        ) : (<></>) }
      </div>
      <Popup open={open}  modal nested>
        <form className=" text-lg container p-8 space-y-6 rounded-md shadow  bg-gradient-to-r from-[#833ab4] to-[#1dc0fd] ">
            <button className="btn btn-circle absolute  top-0 right-0 mt-2 mr-2"  onClick={closeModal}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="w-full text-3xl font-bold leading-tight">End of the day Activity</h2>
            <div>
                <label className="block mb-1 ml-1">Do I feel happy with how the day went?</label>
                <select name="feel" className="w-[75px] h-[50px] rounded-lg px-2" value={feel? 'Yes' : 'No'} onChange={e => setFeel(e.target.value==='Yes'? true : false)}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
            </div>
            <div>
                <label className="block mb-1 ml-1">Why do you feel this way?</label>
                <input value={why} type="text"  onChange={e => setWhy(e.target.value)}  className="block w-full p-2 rounded border-2 bg-[#F3FBCE]" />
            </div>
            <div className="text-right">
                <button onClick={e => saveDescription(e)}  className=" px-4 py-2 font-bold rounded shadow text-white bg-blue-500 focus:outline-none hover:bg-blue-600 ">Save </button>
            </div>
        </form>
      </Popup>
      <ToastContainer/>
    </div>
  )
}

export default Task