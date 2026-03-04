import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Bookhistory from "./pages/Bookhistory";
import Admin from "./pages/Admin"

import Appointments from "./components/Appointments";
import Service from "./pages/Service";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



function Router() {
  return (
    <BrowserRouter>
    <Navbar role={role} />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/appointment" element={<Appointments />} />
        <Route path="/history" element={<Bookhistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
         <Route  path="/admin"  element={localStorage.getItem("role") === "admin"? <Admin />: <Navigate to="/" />}
/>
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}
//<Route path='/admin' element={<Admin/>}/>

export default Router;
