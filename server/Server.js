const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

app.use(cookieParser());

dotenv.config(); // Add this line to load environment variables

const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// Define the Routes
const UseRoutes = require("./Routes/UserRoutes.js");
// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route Middlewares
app.use("/jwt", UseRoutes);

mongoose
  .connect(process.env.URL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server Running on port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Fail to connect", error);
  });
