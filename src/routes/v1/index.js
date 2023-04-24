const express = require("express");
const userRoute = require("./user.route");

const router = express.Router();
const validate = require("../../middlewares/validate");

const userController = require("../../controllers/user.controller");
const cartRoute = require("./cart.route");

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Reroute all API requests beginning with the `/v1/users` route to Express router in user.route.js

// router.get(
//     "/:userId",
//     userController.getUser
//   );

const authRoute = require ("./auth.route");
const productRoute = require("./product.route");
router.use("/auth",authRoute);
router.use("/users", userRoute);
router.use("/products",productRoute);
router.use("/cart", cartRoute);

module.exports = router;
