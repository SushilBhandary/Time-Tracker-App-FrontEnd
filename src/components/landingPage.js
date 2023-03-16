import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center h-screen   bg-gradient-to-r from-pink-500 to-yellow-500">
            <div className="md:w-[full] w-[80%] h-[50%] max-w-md p-8 space-y-3 rounded-xl  bg-gradient-to-r from-amber-200 to-yellow-500 flex flex-col justify-around">
                <h1 className="text-center p-4 text-4xl text-white"> Wellcome to FORUM Application</h1>
                <div className="flex justify-around">
                    <button onClick={e => { e.preventDefault(); navigate("/login");}} className="block  bg-blue-500  hover:bg-blue-600 p-3  text-white  focus:outline-none rounded-lg ">Login</button> 
                    <button onClick={e => { e.preventDefault(); navigate("/signup");}}  className="block  bg-blue-500  hover:bg-blue-600 p-3 text-white  focus:outline-none  rounded-lg ">Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage

