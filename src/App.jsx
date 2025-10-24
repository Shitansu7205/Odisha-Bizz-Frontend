import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard";
import CreateListing from "./pages/CreateListing";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

function AppWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ["/admin/login", "/admin/signup"]; // Add any path where navbar should be hidden
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listing/create" element={<CreateListing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

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
          <AppWrapper />
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
