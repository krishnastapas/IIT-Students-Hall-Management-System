import React, { useState } from 'react'
import AuthLayout from "../../../component/authLayout"
import SignIn from './ChiefWarden'
import StudentLogin from './StudentLogin'
import ChiefWardenLogin from './ChiefWarden'
import WardenLogin from './WardenLogin'
import MessLogin from './Mess'

function Index() {

    const [showLogin, setShowLogin] = useState("student")
    return (
        <div>
            <AuthLayout>
                {showLogin == "student" ? <StudentLogin /> : ""}
                {showLogin == "warden" ? <WardenLogin /> : ""}
                {showLogin == "chiefWarden" ? <ChiefWardenLogin /> : ""}
                {showLogin == "mess" ? <MessLogin/> : ""}
                <div className='flex'>

                    <button type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={()=>setShowLogin("student")}
                    >Student Login</button>

                    <button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={()=>setShowLogin("warden")}
                
                    > Warden Login</button>
                     <button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={()=>setShowLogin("mess")}
                
                    > Mess Login</button>

                    <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={()=>setShowLogin("chiefWarden")}
                    
                    >Cheif Warden Login</button>
                </div>

            </AuthLayout>
        </div>
    )
}

export default Index