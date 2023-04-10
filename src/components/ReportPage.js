
import { useEffect } from 'react';
import PieChart from 'react-pie-graph-chart';
import axios from "axios"
import API from "./api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';

function ReportPage() {
    let call = true
    const [task, satTask] = useState()

    useEffect( () => {
        const dateUpdateAction = async() => {
          if (call) {
            call = false
            const data = JSON.parse(localStorage.getItem("jwt"))
            console.log(data.token);
            await axios.post(`${API}/api/task/gettask`, {
              date :  Date(Date.now())
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
      }, [])

  return (
    <div className='bg-red-600 w-[90vw] h-[95vh] rounded-lg p-10 mx-auto my-[2vh]'>
        <div className='flex justify-between'>
            <button className="py-2 px-5 bg-green-500 rounded-lg h-[50px] w-[180px]" >Back to home page</button>
            <h1 className='h-[50px] w-[380px] text-2xl text-center bg-yellow-400 py-[10px] rounded-lg'>Report</h1>
            <button className="py-2 px-5 bg-green-500 rounded-lg h-[50px] w-[180px]" >Change Date</button>
        </div>
        <div className='bg-rose-400 h-[90%] p-10 rounded-lg mt-6'>
            <div>
               {task ? (
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
               ) : (
                <></>
               )}
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default ReportPage