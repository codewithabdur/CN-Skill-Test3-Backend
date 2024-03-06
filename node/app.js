const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to MongoDB server!!!"))
  .catch((err) => console.log("Error in connecting MongoDB...", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", authRoutes); // Use the authRoutes without prefix



// Serve static files from the "public" directory
app.get('/public/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'style.css'));
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
