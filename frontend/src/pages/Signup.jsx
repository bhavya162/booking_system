import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../api/user";
import "./signup.css";
import Navbar from "../components/Navbar";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    if (e) e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await signupUser({
        username,
        email,
        password,
      });

      alert("Account created successfully! Please login.");

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login");

    } catch (error) {
      const serverMessage =
        error.response?.data?.message ||
        "Something went wrong. Try again.";

      alert("Registration Failed: " + serverMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="signup-hero">
        <h1>Join Our Salon Family</h1>
        <p>Create an account to book and manage your beauty appointments</p>
      </div>

      <div className="signup-container">
        <div className="signup-box">
          <h2>Create Account</h2>

          <label>Username</label>
          <input
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button onClick={handleSignup} disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;