// lib
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { UserAuthContextProvider, useUserAuth } from '../context/UserAuthContext';
import Layout from "../../component/Layout/Index"

import Dashboard from "../chiefWardenDashboard/Router"
function Main() {
    // const { user } = useUserAuth()
    return (
            <Routes>
                
                <Route path='/*' element={<Others />}></Route>
                {/* <Route path='/*' element={<Login />}></Route> */}
            </Routes>
        // </UserAuthContextProvider>

    )
}

function Others() {
    const { user } = useUserAuth();

    const navigate = useNavigate()

    console.log(user)

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user])

    return (
        <>
            {user ? <>
            <Layout>
                <Routes>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                    
                    
                </Routes>
            </Layout>
            </> : ""
            } 

        </>
    )
}


export default Main;