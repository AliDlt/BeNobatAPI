module.exports.handleSuccess = (res, message, data = null, status = true) => {
  res.status(200).json({
    message,
    data,
    status,
  });
};

module.exports.handleNotFound = (res, message, data = null, status = false) => {
  res.status(404).json({
    message,
    data,
    status,
  });
};

module.exports.handleBadRequest = (
  res,
  message,
  data = null,
  status = false
) => {
  res.status(400).json({
    message,
    data,
    status,
  });
};

module.exports.handleServerError = (
  res,
  message,
  data = false,
  status = false
) => {
  res.status(500).json({
    message,
    data,
    status,
  });
};
