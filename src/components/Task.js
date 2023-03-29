

const Task = () => {
  return (
    <div className="bg-red-600 w-[70vw] h-[90vh] rounded-lg p-10">
        <div className="flex justify-between">
          <h1 className="text-3xl text-white mb-5">Task with Time</h1>
          <h1 className="text-3xl text-white mb-5"> Date : </h1>
        </div>
        
        <div className="bg-rose-400 h-[95%] overflow-auto p-10 rounded-lg">
          <div className="bg-rose-300 p-10 rounded-lg text-2xl text-slate-400 mb-5">
            <div className=" flex justify-between mb-5">
              <div className="text-center">
                <h1 className="mb-2">Task Name</h1>
                <input type="text" className=" w-[500px] h-[50px] rounded-lg px-3" />
              </div >
              <div className="text-center">
                <h1 className="mb-2">From</h1>
                <h2 className="py-3 px-5 bg-blue-500 rounded-lg">8:00</h2>
              </div>
              <div className="text-center">
                <h1 className="mb-2">To</h1>
                <h2 className="py-3 px-5 bg-blue-500 rounded-lg">9:00</h2>
              </div>
            </div>
            <div className="flex justify-around">
              <div className="text-center">
                <h1 className="mb-2">Urgent</h1>
                <select name="Urgent" className="w-[75px] h-[50px] rounded-lg px-2">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="text-center">
                <h1 className="mb-2">Important</h1>
                <select name="Important" className="w-[75px] h-[50px] rounded-lg px-2">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-rose-300 p-10 rounded-lg text-2xl text-slate-400 mb-5">
            <div className=" flex justify-between mb-5">
              <div className="text-center">
                <h1 className="mb-2">Task Name</h1>
                <input type="text" className=" w-[500px] h-[50px] rounded-lg px-3" />
              </div >
              <div className="text-center">
                <h1 className="mb-2">From</h1>
                <h2 className="py-3 px-5 bg-blue-500 rounded-lg">8:00</h2>
              </div>
              <div className="text-center">
                <h1 className="mb-2">To</h1>
                <h2 className="py-3 px-5 bg-blue-500 rounded-lg">9:00</h2>
              </div>
            </div>
            <div className="flex justify-around">
              <div className="text-center">
                <h1 className="mb-2">Urgent</h1>
                <select name="Urgent" className="w-[75px] h-[50px] rounded-lg px-2">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="text-center">
                <h1 className="mb-2">Important</h1>
                <select name="Important" className="w-[75px] h-[50px] rounded-lg px-2">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-rose-300 p-10 rounded-lg text-2xl text-slate-400 mb-5">
            <div className=" flex justify-between mb-5">
              <div className="text-center">
                <h1 className="mb-2">Task Name</h1>
                <input type="text" className=" w-[500px] h-[50px] rounded-lg px-3" />
              </div >
              <div className="text-center">
                <h1 className="mb-2">From</h1>
                <h2 className="py-3 px-5 bg-blue-500 rounded-lg">8:00</h2>
              </div>
              <div className="text-center">
                <h1 className="mb-2">To</h1>
                <h2 className="py-3 px-5 bg-blue-500 rounded-lg">9:00</h2>
              </div>
            </div>
            <div className="flex justify-around">
              <div className="text-center">
                <h1 className="mb-2">Urgent</h1>
                <select name="Urgent" className="w-[75px] h-[50px] rounded-lg px-2">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="text-center">
                <h1 className="mb-2">Important</h1>
                <select name="Important" className="w-[75px] h-[50px] rounded-lg px-2">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Task