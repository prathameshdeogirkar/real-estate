require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db");

const propertyRoutes = require("./routes/propertyRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const completedProjectRoutes = require("./routes/completedProjectRoutes");
const adminRoutes = require("./routes/adminRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const constructionRoutes = require("./routes/constructionRoutes");
const interiorWorkRoutes = require("./routes/interiorWorkRoutes");
const governmentProjectRoutes = require("./routes/governmentProjectRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/properties", propertyRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/completed-projects", completedProjectRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/constructions", constructionRoutes);
app.use("/api/interior-works", interiorWorkRoutes);
app.use("/api/government-projects", governmentProjectRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔴 Global Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});