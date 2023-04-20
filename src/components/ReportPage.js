
import { useEffect } from 'react';
import PieChart from 'react-pie-graph-chart';
import axios from "axios"
import API from "./api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function ReportPage() {
    let call = true
    const [task, satTask] = useState()
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [date, setdate] = useState(Date(Date.now()))
    const [changeDates, setChangeDates] = useState()

    useEffect( () => {
      console.log('In use effect');
        const dateUpdateAction = async() => {
          if (call) {
            call = false
            const data = JSON.parse(localStorage.getItem("jwt"))
            console.log(data.token);
            await axios.post(`${API}/api/task/gettask`, {
              date : date ? date : Date(Date.now())
            }, {
              headers: {
                authorization: data.token
              }
            })
            .then((res) => {
                if (res.data.success) {
                  console.log(res.data);
                  satTask(res.data.task)
                  console.log(task);
                } else {
                  console.log('error');
                    toast.error(res.data.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })
                }
              
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
      }, [changeDates])

    const closeModal = (e) => {
      e.preventDefault()
      setOpen(false)
    };

    
  const changeDate = (e) => {
    e.preventDefault()
    setOpen(false)
    setChangeDates(date)
  }

  return (
    <div className='bg-red-600 w-[90vw] h-[95vh] rounded-lg p-10 mx-auto my-[2vh]'>
        <div className='flex justify-between'>
            <button className="py-2 px-5 bg-green-500 rounded-lg h-[50px] w-[180px]" onClick={e => navigate('/home')}>Back to home page</button>
            <h1 className='h-[50px] w-[380px] text-2xl text-center bg-yellow-400 py-[10px] rounded-lg'>Report</h1>
            <button className="py-2 px-5 bg-green-500 rounded-lg h-[50px] w-[180px]"  onClick={e => setOpen(!open) }>Change Date</button>
        </div>
        {task && task.urgentVsImportantMatrix? (
          <div className='bg-rose-400 h-[90%] p-10 rounded-lg mt-6 flex justify-around'>
              <div className='bg-red-600 w-[45%] h-[100%] rounded-lg p-10'>
                  <PieChart data={[
                    {
                      type: "Urgent & Important",
                      value: task.urgentVsImportantMatrix.yesYes,
                      color: "#E97D30"
                  },{
                      type: "NOt Urgent & Important",
                      value: task.urgentVsImportantMatrix.noYes,
                      color: "#1B98F5"
                  },{
                    type: "Urgent & Not Important",
                    value: task.urgentVsImportantMatrix.yesNo,
                    color: "#3DBE29"
                },{
                    type: "Not Urgent & Not Important",
                    value: task.urgentVsImportantMatrix.noNo,
                    color: "#EDC126"
                }
                  ]} />
              </div>
              <div className='bg-red-600 w-[50%] h-[100%] rounded-lg p-10  overflow-auto text-center text-2xl'>
                <h1 className='h-[50px] w-[auto] bg-yellow-400 py-[10px] rounded-lg m-auto my-1'>Urgent & Important  : {task.urgentVsImportantMatrix.yesYes}%</h1>
                <h1 className='h-[50px] w-[auto] bg-yellow-400 py-[10px] rounded-lg m-auto my-1'>NOt Urgent & Important  : {task.urgentVsImportantMatrix.noYes}%</h1>
                <h1 className='h-[50px] w-[auto] bg-yellow-400 py-[10px] rounded-lg m-auto my-1'>Urgent & Not Important  : {task.urgentVsImportantMatrix.yesNo}%</h1>
                <h1 className='h-[50px] w-[auto] bg-yellow-400 py-[10px] rounded-lg m-auto my-1'>Not Urgent & Not Important  : {task.urgentVsImportantMatrix.noNo}%</h1>
                <div  className='bg-red-400 w-[99%] h-[90%] rounded-lg px-10 '>
                  <h1 className='h-[50px] w-[auto] text-3xl py-[10px] rounded-lg m-auto my-3'>Tasks Distribution</h1>
                  <h1 className='h-[50px] w-[auto] bg-yellow-400 py-[10px] rounded-lg m-auto my-1'>Urgent - Yes : {task.Urgent.yes}%</h1>
                  <h1 className='h-[50px] w-[auto] bg-yellow-400 py-[10px] rounded-lg m-auto my-1'>Urgent - No : {task.Urgent.no}%</h1>
                  <h1 className='h-[50px] w-[auto] bg-yellow-400 py-[10px] rounded-lg m-auto my-1'>Important - Yes : {task.Important.yes}%</h1>
                  <h1 className='h-[50px] w-[auto] bg-yellow-400 py-[10px] rounded-lg m-auto my-1'>Important - No : {task.Important.no}%</h1>
                  <h1 className='h-[50px] w-[auto] bg-yellow-400 py-[10px] rounded-lg m-auto my-1'>Do I feel happy with how the day went?  : {task.feelingGood ? 'Yes' : 'No'}</h1>
                  <h1 className='h-[50px] w-[auto] bg-yellow-400 py-[10px] rounded-lg m-auto my-1'>Why do you feel this way?  : {task.why}</h1>
                </div>
              </div>
          </div>
        ) : (
          <div  className='bg-rose-400 h-[90%] p-10 rounded-lg mt-6 flex justify-around text-4xl'>
            There is No data
          </div>
        )}
        <Popup open={open}  modal nested>
          <form className=" text-lg container p-8 space-y-6 rounded-md shadow  bg-gradient-to-r from-[#833ab4] to-[#1dc0fd] ">
              <button className="btn btn-circle absolute  top-0 right-0 mt-2 mr-2"  onClick={closeModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h2 className="w-full text-3xl font-bold leading-tight">Change Date</h2>
              <div>
                  <label className="block mb-1 ml-1">Select Date</label>
                  <input type="date"  className="block w-full p-2 rounded border-2 bg-[#8de0ff]" onChange={e => setdate(e.target.value)}/ >
              </div>
              <div className="text-right">
                  <button onClick={e => changeDate(e)}  className=" px-4 py-2 font-bold rounded shadow text-white bg-blue-500 focus:outline-none hover:bg-blue-600 ">Change Date</button>
              </div>
          </form>
        </Popup>
        <ToastContainer/>
    </div>
  )
}

export default ReportPage