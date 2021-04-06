const express = require("express");
const router = express.Router();


const campgrounds = require("../controllers/campgrounds");

const Campground = require("../models/campground");
const catchAsync = require("../Utilities/catchAsync");
const {isLoggedIn, isAuthor, validateCampground} = require("../middlerware");

const multer = require("multer");   //parser for multipart/form-data
const { storage } = require("../cloudinary");
const upload = multer({ storage });


router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampgrounds));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
    .get(catchAsync(campgrounds.showCampgrounds))
    .put(isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn,  catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor,  catchAsync(campgrounds.renderEditForm));




module.exports = router;