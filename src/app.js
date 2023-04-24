const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const routes = require("./routes/v1");
const config = require("./config/config");
// const config = require("./config/morgan");
// const config = require("./config/logger");
const helmet = require("helmet");
const {errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");


const app = express();
// if (config.env !== "test") {
//     app.use(morgan.successHandler);
//     app.use(morgan.errorHandler);
//   }


  app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// Passport jwt authentication config
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Reroute all API request starting with "/v1" route
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
// convert error to ApiError, if needed

// app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;