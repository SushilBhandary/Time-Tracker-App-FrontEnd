

const Header = () => {
  return (
    <div className="bg-cyan-500 w-[25vw] h-[90vh] rounded-lg flex flex-col justify-around items-center text-2xl">
        <div>
          <div class="relative md:w-36 md:h-36 w-12 h-12 bg-gradient-to-r from-[#833ab4] to-[#1dc0fd] rounded-full flex justify-center items-center text-center p-5 shadow-xl mr-4 md:text-4xl  text-xl text-white ">
            S
          </div>
          <h1 className="text-center"> UserName </h1>
        </div>
        <button className="py-3 px-5 bg-blue-500 rounded-lg">Change Date</button>
        <button className="py-3 px-5 bg-blue-500 rounded-lg">Report Genrate</button>
        <button className="py-3 px-5 bg-blue-500 rounded-lg">LogOut</button>
        
      </div>
  )
}

export default Header