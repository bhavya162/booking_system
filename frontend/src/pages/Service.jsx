import API from "../api/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./service.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Service() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    API.get("/services")
      .then((res) => {
        setServices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="services-hero">
        <h1>Our Premium Services</h1>
        <p>Luxury treatments tailored for your beauty and comfort</p>
      </div>

      <div className="services-container">
        <div className="services-grid">
          {services.map((s) => (
            <div key={s._id} className="service-card">

              <img
                src={
                  s.serviceimg
                    ? s.serviceimg
                    : "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
                }
                alt={s.servicename}
              />

              <div className="service-content">
                <h3>{s.servicename}</h3>
                <p className="service-desc">{s.description}</p>

                <div className="service-info">
                  <span>⏱ {s.duration} min</span>
                  {s.price && <span className="price">₹{s.price}</span>}
                </div>

                <Link to="/appointment">
                  <button className="book-btn">Book Now</button>
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Service;