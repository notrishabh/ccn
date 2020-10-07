const express = require("express");
const route = express.Router();
const mysql = require("mysql");
const { ensureAuthenticateds } = require("../config/adminAuth"); //Login Authenticator



route.get('/',ensureAuthenticateds, (req,res)=>{
    res.render("offlinePayments", {
        user : req.user,
        results : "none",
        displayDetails : "none"
    });
});

route.post("/",ensureAuthenticateds, (req, res) => {
  stb = req.body.stb;
  let sql = `SELECT * FROM info WHERE stb = "${stb}"`;
  db.query(sql, (err, results) => {
      console.log(results[0]);
    res.render("offlinePayments", {
      user: req.user,
      results: results[0],
      displayDetails: "block",
      noResults: "none",
    });
  });
});



module.exports = route;