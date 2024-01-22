const Appointment = require("../Models/appointmentModel");

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const newAppointment = await Appointment.create(req.body);
    res.status(201).json({
      message: "Appointment created successfully.",
      data: newAppointment,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const appointments = await Appointment.find()
      .skip((page - 1) * count)
      .limit(Number(limit));

    res.status(200).json({
      message: "Appointments retrieved successfully.",
      data: appointments,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get all appointments by expert Id
const getAllAppointmentsByExpertId = async (req, res) => {
  try {
    const { expertId, page, limit } = req.query;

    if (!expertId) {
      return res.status(400).json({
        message: "Expert ID is required.",
        data: null,
        status: false,
      });
    }

    const appointments = await Appointment.find({ expert: expertId })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      message: "Appointments retrieved successfully.",
      data: appointments,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Appointment retrieved successfully.",
      data: appointment,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Update appointment by ID
const updateAppointmentById = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({
        message: "Appointment not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Appointment updated successfully.",
      data: updatedAppointment,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Delete appointment by ID
const deleteAppointmentById = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAppointment) {
      return res.status(404).json({
        message: "Appointment not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Appointment deleted successfully.",
      data: deletedAppointment,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAllAppointmentsByExpertId,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
};
