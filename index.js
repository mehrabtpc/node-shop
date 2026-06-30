import express from "express";
import bodyParser from "body-parser";
import User from "./src/models/user.model.js";
import "./src/config/db.js";
import app from "./src/app.js";



// app.use(express.json());
// app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server Running: http://localhost:${PORT}`);
});
