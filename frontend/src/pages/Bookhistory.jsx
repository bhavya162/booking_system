import API from "../api/index";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Bookhistory.css";

function Bookhistory() {
  const [bookings, setBookings] = useState([]);

  // ================= FETCH BOOKINGS =================
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const res = await API.get("/appointments/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setBookings(res.data);
      } catch (err) {
        console.error("Fetch Error:", err.response?.data || err.message);
      }
    };

    fetchBookings();
  }, []);

  // ================= CANCEL FUNCTION =================
  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Update UI instantly
      setBookings(prev =>
        prev.map(b =>
          b._id === id ? { ...b, status: "cancelled" } : b
        )
      );

      alert("Appointment cancelled successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  // ================= UI =================
  return (
    <>
      <Navbar />

      <div className="history-container">
        <h2>My Booking History</h2>

        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map(b => {
            const appointmentDate = new Date(b.startTime);
            const now = new Date();
            console.log(b.service);
            // ✅ Allow cancel only if appointment is in future
            const canCancel =
              appointmentDate > now &&
              b.status !== "cancelled";

            return (
              <div
                key={b._id}
                style={{
                  border: "1px solid #ccc",
                  margin: "10px",
                  padding: "10px"
                }}
              >
              
                <p>
                  <strong>Service:</strong>{" "}
                  {b.service?.servicename || "Service no longer available"}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {appointmentDate.toLocaleString()}
                </p>

                <p>
                  <strong>Status:</strong> {b.status}
                </p>

                {canCancel && (
                  <button onClick={() => handleCancel(b._id)}>
                    Cancel Appointment
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      <Footer />
    </>
  );
}

export default Bookhistory;