
const Appointment = require("../models/appointment.models");
//const sendMail = require("../utils/sendMail");

const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { serviceId, startTime, endTime, contact } = req.body;

    if (!serviceId || !startTime) {
      return res.status(400).json({ message: "Service and Start Time are required" });
    }

    const clash = await Appointment.findOne({
      startTime,
      service: serviceId,
      status: { $ne: "cancelled" }
    });

    if (clash)
      return res.status(400).json({ message: "Slot already booked" });

    const newAppointment = await Appointment.create({
      user: userId,
      service: serviceId,
      startTime,
      endTime,
      contact
    });

    // ✅ SEND MAIL HERE
    await sendMail(
      req.user.email,
      "Booking Confirmation",
      `Your booking has been confirmed for ${new Date(startTime).toLocaleString()}`
    );

    res.status(201).json({
      message: "Booked successfully",
      data: newAppointment
    });

  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= GET MY =================
const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id; 

    // Use .lean() to make the query faster and easier to read
    const bookings = await Appointment.find({ user: userId })
      .populate({
        path: 'service',
        select: 'servicename price' // Only get the fields you actually need
      })
      .sort({ startTime: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Backend Error in getMyAppointments:", err);
    res.status(500).json({ message: "Error fetching your bookings" });
  }
};

// ================= CANCEL =================
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const appointment = await Appointment.findById(id);

    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    if (appointment.user.toString() !== userId)
      return res.status(403).json({ message: "Not authorized" });

    if (appointment.status === "cancelled")
      return res.status(400).json({ message: "Already cancelled" });

    const appointmentDate = new Date(appointment.startTime);
    const now = new Date();

    // ✅ Allow cancel only if appointment is in future
    if (appointmentDate <= now) {
      return res.status(400).json({
        message: "You cannot cancel past appointments"
      });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({ message: "Cancelled successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const sendMail = require("../utils/sendMail");

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      user: req.user.id,
      service: req.body.service,
      startTime: req.body.startTime
    });

    // Send Email
    await sendMail(
      req.user.email,
      "Booking Confirmation",
      `Your booking has been confirmed for ${req.body.startTime}`
    );

    console.log("📌 Booking created:", appointment._id);

    res.status(201).json(appointment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Booking failed" });
  }
};

// ✅ proper export
module.exports = {
  bookAppointment,
  getMyAppointments,
  cancelAppointment
};
    /*
    // ================= BOOK =================
    const bookAppointment = async (req, res) => {
      try {
        // IMPORTANT: Get userId from the TOKEN (req.user), not the body
        // This ensures people can't book for other users!
        const userId = req.user.id; 
        const { serviceId, startTime, endTime, contact } = req.body;
    
        // 1. Check for basic missing data
        if (!serviceId || !startTime) {
          return res.status(400).json({ message: "Service and Start Time are required" });
        }
    
        // 2. Check for slot clash
        const clash = await Appointment.findOne({
          startTime,
          service: serviceId,
          status: { $ne: "cancelled" } // Ignore cancelled appointments when checking for clash
        });
    
        if (clash) return res.status(400).json({ message: "Slot already booked" });
    
        // 3. Create appointment
        const newAppointment = await Appointment.create({
          user: userId,
          service: serviceId,
          startTime,
          endTime,
          contact
        });
    
        res.status(201).json({ message: "Booked successfully", data: newAppointment });
      } catch (err) {
        console.error("Booking Error:", err);
        res.status(500).json({ message: err.message });
      }
    };
    */