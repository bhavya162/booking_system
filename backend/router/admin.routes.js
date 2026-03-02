const express = require("express");
const router = express.Router();

const { verifyUser } = require("../middlewear/auth.middlewear");
const { isAdmin } = require("../middlewear/admin.middleware");

const Appointment = require("../models/appointment.models");
const Service = require("../models/Services.model");


// Get all bookings
router.get("/bookings", verifyUser, isAdmin, async (req, res) => {
  const bookings = await Appointment.find()
    .populate("user")
    .populate("service");

  res.json(bookings);
});

router.get("/appointments/", verifyUser, async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id })
      .populate("service")   
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new service
router.post("/services", verifyUser, isAdmin, async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
});

// Get all services
router.get("/services", verifyUser, isAdmin, async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

//delete the service
router.delete("/services/:id", verifyUser, isAdmin, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Service deleted" });
});

module.exports = router;
