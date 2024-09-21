const express = require("express");
require("dotenv").config();
const routes = require("./routes/routes"); // Import routes
const db = require("./configs/db");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

db.connect(); // Connect to the database
app.use(routes); // Use routes

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
