const Customer = require("../../Models/customerModel");

// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json({
      message: "Customer created successfully.",
      data: newCustomer,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get all customers with pagination
const getAllCustomers = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const customers = await Customer.find()
      .skip((page - 1) * count)
      .limit(Number(limit));

    res.status(200).json({
      message: "Customers retrieved successfully.",
      data: customers,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        message: "Customer not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Customer retrieved successfully.",
      data: customer,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Update customer by ID
const updateCustomerById = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Customer updated successfully.",
      data: updatedCustomer,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

// Delete customer by ID
const deleteCustomerById = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({
        message: "Customer not found.",
        data: null,
        status: false,
      });
    }
    res.status(200).json({
      message: "Customer deleted successfully.",
      data: deletedCustomer,
      status: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, data: false });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
