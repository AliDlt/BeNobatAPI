const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./Config/db");

require("dotenv").config();

const port = process.env.PORT;

// Enable CORS for all routes
app.use(cors());

// app.use(
//   helmet({
//     crossOriginIsolated: false,
//   })
// );

//* Database connection
db.connectDB();

app.use(express.json());
//app.use(express.static("public"));

//* BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static("public"));

//Handle Default
app.get("/", function (req, res) {
  res.status(200).json("Welcome to BeNobat Api");
});

// routes
app.use(require("./Routes/businessRoute"));
app.use(require("./Routes/authRoute"));
app.use(require("./Routes/smsRoute"));
app.use(require("./Routes/appointmentRoute"));
app.use(require("./Routes/expertiseRoute"));
app.use(require("./Routes/paymentInfoRoute"));
app.use(require("./Routes/serviceRoute"));

app.use(require("./Routes/UserRoutes/adminRoute"));
app.use(require("./Routes/UserRoutes/customerRoute"));
app.use(require("./Routes/UserRoutes/expertRoute"));
app.use(require("./Routes/UserRoutes/secretaryRoute"));

// Handle 404
app.get("*", function (req, res) {
  res.status(404).json("Route Not found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
