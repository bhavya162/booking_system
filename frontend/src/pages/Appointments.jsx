import { useState, useEffect } from "react";
import axios from "axios";
import { bookAppointment } from "../api/appointment";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./appoint.css";

function Appointments() {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/services");
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceChange = (id) => {
    setServiceId(id);
    const service = services.find((s) => s._id === id);
    setSelectedService(service);
  };

  const handleSubmit = async () => {
    if (!serviceId || !startTime || !contact) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const duration = selectedService?.duration || 60;
      const calculatedEndTime = new Date(
        new Date(startTime).getTime() + duration * 60 * 1000
      );

      await bookAppointment({
        serviceId,
        startTime,
        endTime: calculatedEndTime,
        contact,
      });

      alert("Appointment Booked Successfully!");
      setServiceId("");
      setSelectedService(null);
      setStartTime("");
      setContact("");
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Booking failed. Try again.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="appointment-hero">
        <h1>Book Your Appointment</h1>
        <p>Experience luxury beauty care with our experts</p>
      </div>

      <div className="appointment-container">
        <div className="appointment-card">

          {/* Service Dropdown */}
          <label>Select Service</label>
          <select
            value={serviceId}
            onChange={(e) => handleServiceChange(e.target.value)}
          >
            <option value="">Select Service</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.servicename}
              </option>
            ))}
          </select>

          {/* Service Info Preview */}
          {selectedService && (
            <div className="service-preview">
              <p><strong>Duration:</strong> {selectedService.duration} min</p>
              <p><strong>Price:</strong> ₹{selectedService.price}</p>
            </div>
          )}

          {/* Date & Time */}
          <label>Select Date & Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          {/* Contact */}
          <label>Contact Number</label>
          <input
            placeholder="Enter your phone number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Appointments;