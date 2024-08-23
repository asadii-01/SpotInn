const Review = require("../models/review");
const Listing = require("../models/lisitngs");

module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New Review Created !!");
  res.redirect(`/listings/${listing.id}`);
};

module.exports.deleteReview = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.id, {
    $pull: { reviews: req.params.reviewId },
  });
  await Review.findByIdAndDelete(req.params.reviewId);
  req.flash("success", "Review Deleted !!");
  res.redirect(`/listings/${req.params.id}`);
};
