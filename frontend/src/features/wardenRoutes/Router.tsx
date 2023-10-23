// lib
import {  useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { UserAuthContextProvider, useUserAuth } from '../context/UserAuthContext';
import Layout from "../../component/Layout/Index"


function Main() {
    // const { user } = useUserAuth()
    return (
        <UserAuthContextProvider>
            <Routes>
                <Route path='/*' element={<Others />}></Route>
            </Routes>
        </UserAuthContextProvider>

    )
}

function Others() {
    const { user } = useUserAuth();

    const navigate = useNavigate()

    console.log(user)

    useEffect(() => {
        if (!user) {
            navigate("/admin/login")
        }
    }, [user])

    return (
        <>
            <Layout>
            <Routes>
                
               
            </Routes>
            </Layout>
           

        </>
    )
}


export default Main;