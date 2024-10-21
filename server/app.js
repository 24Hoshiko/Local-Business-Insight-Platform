
// My original

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Order = require("./models/orders.model.js");
const orderRoutes = require("./routes/order.route.js");
const searchRoutes = require("./routes/search.route.js");
// Allow requests from the frontend running on localhost:5173
app.use(cors());

// Middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from Local Business Insight Platform");
});

app.use("/form", orderRoutes);
app.use("/search", searchRoutes);

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Local_Business_Insight_Platform")
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
