const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/lisitngs");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66cc6ac2457ea7bf25729cc5",
  }));
  await Listing.insertMany(initData.data);
  console.log("Database was initilized");
};

initDB();
