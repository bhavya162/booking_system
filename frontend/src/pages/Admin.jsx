import { useEffect, useState } from "react";
import API from "../api";
import "./Admin.css";
import Navbar from "../components/Navbar";
//import NavbarAdm from "../components/NavbarAdmn";

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    servicename: "",
    descp: "",
    serviceimg: "",
    duration: "",
    price: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await axios.get("YOUR_URL")
      setBookings(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchServices = async () => {
    try {
      const res = await axios.get("YOUR_URL")
      setServices(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  fetchBookings()
  fetchServices()
}, [])
  const fetchBookings = async () => {
    try {
      const res = await API.get("/admin/bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await API.get("/admin/services", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(res.data);
    } catch (err) {
      console.log(err.response?.data);
    }
  };
 
  const addService = async () => {
    if (!newService.servicename || !newService.descp) {
      alert("Fill required fields");
      return;
    }

    try {
      await API.post(
        "/admin/services",
        {
          ...newService,
          duration: Number(newService.duration),
          price: Number(newService.price)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setNewService({
        servicename: "",
        descp: "",
        serviceimg: "",
        duration: "",
        price: ""
      });

      fetchServices();
      alert("Service Added Successfully");
    } catch (err) {
      console.log(err.response?.data);
    }
  };



  return (
    <>
      <Navbar />

      <div className="admin-container">
        <h1 className="admin-title">Admin Dashboard</h1>

        {/* BOOKINGS SECTION */}
        <div className="admin-section">
          <h2>All Bookings</h2>

          <div className="booking-table">
            <div className="table-header">
              <span>User</span>
              <span>Service</span>
              <span>Time</span>
              <span>Status</span>

            </div>

            {bookings.map((b) => (
              <div key={b._id} className="table-row">
                <span>{b.user?.email}</span>
                <span>{b.service?.servicename || "No Service"}</span>
                <span>{new Date(b.startTime).toLocaleString()}</span>
                <span className={`status ${b.status}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ADD SERVICE SECTION */}
        <div className="admin-section">
          <h2>Add New Service</h2>

          <div className="service-form">
            <input
              placeholder="Service Name"
              value={newService.servicename}
              onChange={(e) =>
                setNewService({ ...newService, servicename: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              value={newService.descp}
              onChange={(e) =>
                setNewService({ ...newService, descp: e.target.value })
              }
            />

            <input
              placeholder="Image URL"
              value={newService.serviceimg}
              onChange={(e) =>
                setNewService({ ...newService, serviceimg: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Duration (minutes)"
              value={newService.duration}
              onChange={(e) =>
                setNewService({ ...newService, duration: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
              }
            />

            <button onClick={addService}>Add Service</button>
          </div>
        </div>

        {/* SERVICES SECTION */}
        <div className="admin-section">
          <h2>All Services</h2>

          <div className="services-grid">
            {services.map((s) => (
              <div key={s._id} className="service-card">
                <img
                  src={
                    s.serviceimg ||
                    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
                  }
                  alt={s.servicename}
                />
                <h3>{s.servicename}</h3>
                <p>{s.descp}</p>
                <div className="service-meta">
                  <span>{s.duration} mins</span>
                  <span>₹{s.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;