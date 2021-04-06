const express = require("express");
const router = express.Router({mergeParams: true}); //mergeParams is set to true to have access to params of prefix address

const catchAsync = require("../Utilities/catchAsync");

const reviews = require("../controllers/reviews");


const { isLoggedIn, validateReview, isReviewAuthor } = require("../middlerware");


router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;