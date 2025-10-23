import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard";


function App() {


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          {/* <Navbar /> */}
          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>


    </>

  )
}

export default App
