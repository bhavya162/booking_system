

//export const bookAppointment = async (data) => {
  //const res = await API.post("/appointments", data);
 // return res.data;
//};

// Inside your api/appointment.js file
import axios from "axios";
import API from "./index";

/*export const bookAppointment = async (appointmentData) => {
  // 1. Get the token from storage
  const token = localStorage.getItem("token"); 
 console.log("DEBUG: Token from storage is:", token);
  // 2. Send the request with the Authorization header
  if (!token || token === "undefined") {
     throw new Error("You must be logged in to book an appointment");
  }

  const response = await axios.post(
    "http://localhost:5000/api/appointments", 
    appointmentData, 
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};*/
export const bookAppointment = async (appointmentData) => {
  // 1. Get the token from storage
  const token = localStorage.getItem("token");

  // 2. Send it in the headers
  const res = await API.post("/appointments", appointmentData, {
    headers: {
      Authorization: `Bearer ${token}`, // This is the standard format
    },
  });

  return res.data;
};