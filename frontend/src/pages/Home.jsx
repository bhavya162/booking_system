import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home">

        {/* Hero Section */}
        <div className="hero">
          <div className="hero-overlay">
            <h1>Luxury Salon Experience</h1>
            <p>Glow. Style. Confidence.</p>
            <Link to="/appointment">
              <button className="hero-btn">Book Appointment</button>
            </Link>
          </div>
        </div>

        {/* Intro Section */}
        <div className="intro-section">
          <h2>Providing Premium Beauty & Grooming Services</h2>
          <p>
            We offer high-quality salon services tailored to your style and comfort.
            Our professional experts ensure you walk out feeling confident and beautiful.
          </p>
        </div>

        {/* Services Section */}
        <div className="services">
          <h2>Our Services</h2>

          <div className="service-container">

            {/* Service 1 */}
            <div className="service-card">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
                alt="Hair Styling"
              />
              <h3>Hair Styling</h3>
              <p>
                Professional haircuts, styling, coloring, and treatments
                tailored to enhance your personality.
              </p>
              <Link to="/appointment">
                <button>Book Now</button>
              </Link>
            </div>

            {/* Service 2 */}
            <div className="service-card">
              <img
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
                alt="Facial & Skin Care"
              />
              <h3>Facial & Skin Care</h3>
              <p>
                Refresh your skin with premium facials and treatments
                designed for glowing and healthy skin.
              </p>
              <Link to="/appointment">
                <button>Book Now</button>
              </Link>
            </div>

            {/* Service 3 */}
            <div className="service-card">
              <img
                src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250"
                alt="Manicure & Pedicure"
              />
              <h3>Manicure & Pedicure</h3>
              <p>
                Relax and rejuvenate with luxury nail care services
                that leave your hands and feet looking flawless.
              </p>
              <Link to="/appointment">
                <button>Book Now</button>
              </Link>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;