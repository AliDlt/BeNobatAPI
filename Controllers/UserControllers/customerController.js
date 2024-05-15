const Customer = require("../../Models/customerModel");
const {
  handleBadRequest,
  handleNotFound,
  handleServerError,
  handleSuccess,
} = require("../../Utils/handlers");

const createCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    handleSuccess(res, "مشتری با موفقیت ساخته شد.", newCustomer);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const customers = await Customer.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    handleSuccess(res, "مشتری ها با موفقیت دریافت شدند.", customers);
  } catch (error) {
    handleServerError(res, error);
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return handleNotFound(res);
    }
    handleSuccess(res, "مشتری با موفقیت دریافت شد.", customer);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateCustomerById = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return handleNotFound(res);
    }
    handleSuccess(res, "مشتری با موفقیت بروزرسانی شد.", updatedCustomer);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteCustomerById = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return handleNotFound(res);
    }
    handleSuccess(res, "مشتری با موفقیت حذف شد.", deletedCustomer);
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
