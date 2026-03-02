const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "service",
    required: true
  },

  startTime: {
    type: Date,
    required: true
  },

  endTime: {
    type: Date,
    required: true
  },

  contact: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["booked", "cancelled", "completed"],
    default: "booked"
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
