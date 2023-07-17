import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../helper";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState("")

  const navigate = useNavigate()
  
  const getUser = async () => {
    const userToken = localStorage.getItem("access_token")
    const {username} = await verifyToken(userToken)
    setUser(username)
  }

  useEffect(() => {
    getUser()
  },[])

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.clear()
    navigate("/login")
  }

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 sticky top-0">
        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <span className="font-semibold text-xl tracking-tight">
              Nutech Shop
            </span>
          </div>
          <div className="block lg:hidden ">
            <button
              id="nav"
              className="flex items-center px-3 py-2 border-2 rounded text-red-700 border-red-700 hover:text-red-700 hover:border-red-700"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="menu w-full flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
          <div className="lg:flex-grow"/>          
          <div className="flex ">
            {user !== "" && (<p
              className=" block text-md px-4  ml-2 py-2 rounded text-red-700 font-bold hover:text-white mt-4 hover:bg-red-700 lg:mt-0"
              
            >
              Hai, {user}
            </p>)}
            
            <button
              className=" block text-md px-4  ml-2 py-2 rounded text-red-700 font-bold hover:text-white mt-4 hover:bg-red-700 lg:mt-0"
              onClick={handleLogout}
            >
              Keluar
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
