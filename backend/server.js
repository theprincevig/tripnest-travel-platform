if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const port = process.env.PORT || 3000;

const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const { connectDB } = require('./configs/db.config.js');

const app = express();

// Middleware to handle CORS
const corsOptions = {
    origin: 
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
    credentials: true,
}

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

connectDB();

// Health check route (important for Render)
app.get("/", (req, res) => {
  res.send("TripNest API is running...");
});

app.listen(port, () => console.log(`Server listening on port ${port}`));