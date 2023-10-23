
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Warden from "./wardenRoutes/Router"
import CheifWarden from "./cheifWardenRoutes/Router"
import Students from "./studentRoutes/Router";
import Worker from "./WorkerRoutes/Router";
import Login from "./login/Router"
import { UserAuthContextProvider } from './context/UserAuthContext';



function Main() {
    return (
        <Router>
        <UserAuthContextProvider>

            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />
                <Route path='/login/*' element={<Login />}></Route>

                <Route path='/chief-warden/*' element={<CheifWarden />}></Route>
                {/* <Route path='/warden/*' element={<Warden />}></Route> */}
                {/* <Route path='/students/*' element={<Students />}></Route> */}
                {/* <Route path='/worker/*' element={<Worker />}></Route> */}

            </Routes>
            </UserAuthContextProvider>
        </Router>

    )
}

export default Main;