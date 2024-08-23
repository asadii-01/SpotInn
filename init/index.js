const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/lisitngs");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/SpotInn");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66c722cf0fed5952e7696e1d",
  }));
  await Listing.insertMany(initData.data);
  console.log("Database was initilized");
};

initDB();
