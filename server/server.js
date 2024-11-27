const express=require("express");
const app=express()
const cors=require("cors");
app.use(cors())
require("dotenv").config();
const connectDB = require("./config/db");
const userRoute=require("./routes/userRoutes")
const movieRoute=require("./routes/movieRoute");
const theatreRoute=require("./routes/theatreRoute");
const showRoute=require("./routes/showRoute")
const bookingRoute=require("./routes/bookingRoute");
const rateLimit=require("express-rate-limit")
const helmet=require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const path=require("path");


const { validateJWTToken } = require("./middleware/authorizationMiddleware");

const clientBuildPath=path.join(__dirname,"../client/dist");
app.use(express.static(clientBuildPath));

const apiLimiter = rateLimit({
    windowMS: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
  });

  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "example.com"], // Allow scripts from 'self' and example.com
        styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (unsafe)
        imgSrc: ["'self'", "data:", "example.com"], // Allow images from 'self', data URLs, and example.com
        connectSrc: ["'self'", "api.example.com"], // Allow connections to 'self' and api.example.com
        fontSrc: ["'self'", "fonts.gstatic.com"], // Allow fonts from 'self' and fonts.gstatic.com
        objectSrc: ["'none'"], // Disallow object, embed, and applet elements
        upgradeInsecureRequests: [], // Upgrade insecure requests to HTTPS
      },
    })
  );

app.use(express.json())
connectDB();
app.use(mongoSanitize());
app.use("/bms", apiLimiter);
app.use("/bms/users",userRoute)
app.use("/bms/movies",validateJWTToken,movieRoute)
app.use("/bms/theatres",validateJWTToken,theatreRoute)
app.use("/bms/shows",validateJWTToken,showRoute)
app.use("/bms/bookings", validateJWTToken, bookingRoute);

app.listen(process.env.PORT,(req,res)=>{
    console.log("Server is running on port ",process.env.PORT);
})