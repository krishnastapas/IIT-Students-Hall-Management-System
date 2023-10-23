import { Routes, Route } from 'react-router-dom'
// component
import Home from './presenter/SignIn';
import AuthLayout from "../../component/authLayout"




function Main() {
    return (
        <Routes>
            <Route path='/' element={
                <AuthLayout>
                    <Home />
                </AuthLayout>

            }></Route>
        </Routes>
    )
}

export default Main;