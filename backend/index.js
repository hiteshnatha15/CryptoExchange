const express = require("express");
require("dotenv").config();
const routes = require("./routes/routes"); // Import routes
const db = require("./configs/db");
const cors = require("cors");
const cron = require("node-cron");
const { updatePendingDeposits } = require("./controllers/binanceController");
const path = require('path');
const User = require("./models/userModel");

cron.schedule("*/1` * * * *", async () => {
  console.log("Checking for pending deposits...");
  await updatePendingDeposits();
});

const app = express();
app.use(cors());
app.use(express.json());

db.connect(); // Connect to the database
app.use(routes); // Use routes

// Serve the static files from the frontend directory
// app.use(express.static(path.join(__dirname, 'frontend')));

// Set the route for your frontend
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
