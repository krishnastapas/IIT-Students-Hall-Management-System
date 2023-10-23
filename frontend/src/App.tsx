import { useSetting } from './features/context/SettingsContext'
import MainRouter from './features/MainRouter';
import LoadingPage from './component/Loading';

// for taost library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { loading } = useSetting()
  return (
    <div>
      {loading ? <LoadingPage /> : ""}

      {/* for alert or message at top */}
      {/* Toaster is a packege */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />

        {/*  this is the main routing */}
      <MainRouter />

     

    </div>
  )

}

export default App
