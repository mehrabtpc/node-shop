import mongoose from "mongoose";
const dbUrl = "mongodb://localhost:27017/shopik";
 mongoose
  .connect(dbUrl)
  .then(() => console.log("Server Connected To DB Successfully"))
  .catch((err) => console.log(err));
