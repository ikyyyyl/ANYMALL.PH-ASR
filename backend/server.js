const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/records", require("./routes/recordRoutes"));

// server.js or routes/recordRoute.js
app.get("/api/records", async (req, res) => {
  try {
    const records = await Record.find(); // assuming you have a Record model in MongoDB
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch records" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
