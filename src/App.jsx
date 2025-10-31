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
import Test from "./pages/Test";
import Demo from "./pages/Demo";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTopButton from "./components/ScrollToTopButton";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import MainDashboard from "./pages/MainDashboard";


function AppWrapper() {
  const location = useLocation();
  const hideNavbarPaths = ["/admin/login", "/admin/signup", "/admin/dashboard"]; // Add any path where navbar should be hidden
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  const hideFooterPaths = ["/admin/login", "/admin/signup", "/admin/dashboard"]; // Add any path where footer should be hidden
  const showFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<MainDashboard />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/listing/create" element={<CreateListing />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTopButton />
      </main>
      {showFooter && <Footer />}
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
