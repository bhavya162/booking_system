require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./router/user.router.js");
const serviceRoutes = require("./router/service.router.js");
const appointmentRoutes = require("./router/appointment.router.js");


mongoose.connect("mongodb+srv://bhavyasharma805_db_user:bhavya12@cluster0.nwyyn6r.mongodb.net/bookmyservice?retryWrites=true&w=majority")
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const adminRoutes = require("./router/admin.routes");

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(5000, () =>
  console.log("Server running on 5000")
);
const Service = require("./models/Services.model.js");

app.get("/create-test", async (req, res) => {
  const service = await Service.create({
    name: "Hair Cut",
    description: "Basic haircut",
    duration: 30
  });

  res.json(service);
});
