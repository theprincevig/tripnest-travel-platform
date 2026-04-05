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
const AppError = require('./errors/AppError.js');

const authRouter = require('./routes/auth.routes.js');
const profileRouter = require('./routes/profile.routes.js');
const listingRouter = require('./routes/listing.routes.js');
const reviewRouter = require('./routes/review.routes.js');

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

app.use("/api/auth/", authRouter);
app.use("/api/users", profileRouter);
app.use("/api/listings", listingRouter);
app.use("/api/listings/:listingId/reviews", reviewRouter);

app.all("/files{/*path}", (req, res, next) => {
  next(new AppError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong.",
  });
});

// Health check route (important for Render)
app.get("/", (req, res) => {
  res.send("TripNest API is running...");
});

app.listen(port, () => console.log(`Server listening on port ${port}`));