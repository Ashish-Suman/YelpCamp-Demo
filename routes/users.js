const express = require("express");
const router = express.Router({mergeParams: true}); //mergeParams is set to true to have access to params of prefix address
const passport = require("passport");
const User = require("../models/user");

const catchAsync = require("../Utilities/catchAsync");
const ExpressError = require("../Utilities/ExpressError");
const Campground = require("../models/campground");
const Review = require("../models/review");

const users = require("../controllers/users");

router.route("/register")
    .get(users.renderRegisterForm)
    .post(catchAsync(users.register));

router.route("/login")
    .get(users.renderLoginForm)
    .post(passport.authenticate("local", {failureFlash: true, failureRedirect: "/login"}), users.login);

router.get("/logout", users.logout);

module.exports = router;