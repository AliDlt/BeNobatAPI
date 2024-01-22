const express = require("express");
const router = express.Router();
const appointmentController = require("../Controllers/appointmentController");

router.post("/createAppointment", appointmentController.createAppointment);
router.post(
  "/deleteAppointmentById",
  appointmentController.deleteAppointmentById
);
router.post("/getAllAppointments", appointmentController.getAllAppointments);
router.post(
  "/getAllAppointmentsByExpertId",
  appointmentController.getAllAppointmentsByExpertId
);
router.post("/getAppointmentById", appointmentController.getAppointmentById);
router.post(
  "/updateAppointmentById",
  appointmentController.updateAppointmentById
);

module.exports = router;
