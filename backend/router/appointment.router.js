const router = require("express").Router();
const controller = require("../controller/appointment.controllers");
const { verifyUser } = require("../middlewear/auth.middlewear");

router.post("/", verifyUser, controller.bookAppointment);
router.get("/me", verifyUser, controller.getMyAppointments);
router.delete("/:id",verifyUser,controller.cancelAppointment);

module.exports = router;
