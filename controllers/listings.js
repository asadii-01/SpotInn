const Listing = require("../models/lisitngs");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "New listing Created Successfully !!");
  res.redirect("/listings");
};

module.exports.showListings = async (req, res) => {
  const id = req.params.id;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing not found");
    res.redirect("/listings");
  } else {
    res.render("listings/show.ejs", { listing });
  }
};

module.exports.renderEditForm = async (req, res) => {
  const id = req.params.id;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    res.redirect("/listings");
  } else {
    res.render("listings/edit.ejs", { listing });
  }
};

module.exports.updateLisitng = async (req, res) => {
  const id = req.params.id;
  await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
    runValidators: true,
  });
  req.flash("success", "Listing Updated !!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  const id = req.params.id;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted !!");
  res.redirect("/listings");
};
