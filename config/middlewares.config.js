const express = require("express");
const cors = require("cors");
const path = require('path');


const { ORIGIN } = process.env;



function middlewares(app) {
  try {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ credentials: true, origin: ORIGIN }));
    app.use(express.static(path.join(__dirname,"..", 'public')));
  } catch (err) {
    console.log("error", err.message);
  }
}

module.exports = middlewares;
