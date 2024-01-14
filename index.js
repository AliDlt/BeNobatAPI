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

app.use(helmet());

//* Database connection
db.connectDB();

app.use(express.json());
//app.use(express.static("public"));

//* BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use(require("./Routes/businessRoute"));

// Handle 404
app.get("*", function (req, res) {
  res.status(404).json("Route Not found");
});

//Handle Default
app.get("/", function (req, res) {
  res.status(200).json("Welcome to BeNobat Api");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
