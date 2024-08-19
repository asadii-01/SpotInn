const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/lisitngs");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/SpotInn");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine('ejs', ejsMate);

// Home Route
app.get("/", (req, res) => {
  res.send("Root is working");
});

// Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
  const id = req.params.id;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  const id = req.params.id;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  const id = req.params.id;
  await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
    runValidators: true,
  });
  res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
  const id = req.params.id;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
