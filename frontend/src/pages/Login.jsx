import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/index";
import "./login.css";
import Navbar from "../components/Navbar";
import NavbarAdm from "../components/NavbarAdmn";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role,setRole] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/users/login", { email, password });

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        alert("Login successful!");
        if (res.data.role === 'admin'){
          navigate("/admin"); //redirect admin to admin dashboard
        }else{
          navigate("/services"); // redirect after login
        }
      } else {
        alert(res.data.message || "Invalid email or password");
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Server Error"));
    } finally {
      setLoading(false);
    }
  };

  const showNavbar = async () => {
  const res = await API.post('/user/login', { email, password });

  if (res.data && res.data.token) {
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('role', res.data.role);
    setRole(res.data.role);  // 👈 this triggers re-render
  }
};
  return (
    <>
     
    <Navbar/>
      <div className="login-hero">
        <h1>Welcome Back</h1>
        <p>Login to book and manage your appointments</p>
      </div>

      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;