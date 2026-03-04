import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Bookhistory from "./pages/Bookhistory";
import Service from "./pages/Service";
import Appointments from "./pages/Appointments";
import Admin from "./pages/Admin";
import { Navigate } from "react-router-dom";
//import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/history" element={<Bookhistory />} />    
      <Route path="/services" element={<Service />} />  
      <Route path="/appointment" element={<Appointments />} />    
      <Route path = "/login" element = {<Login/>} />
      <Route path = "/Signup" element = {<Signup/>} /> 
      <Route  path="/admin"  element={localStorage.getItem("role") === "admin"? <Admin />: <Navigate to="/" />}
/>
    </Routes>
  );
}
 //<Route path= '/admin' element = {<Admin/>}/>
export default App;
