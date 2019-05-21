var db = require("../models");
var passport = require("passport");

module.exports = function (app) {

  // GET Routes

  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

   // Render user Sign Up page 
  app.get("/signup", function (req, res) {
    res.render("signup");
  });

   // Render user Sign In page 
  app.get("/signin", function (req, res) {
    res.render("signin");
  });

   // Render dashboard page
  app.get("/dashboard", isLoggedIn, function (req, res) {
    res.render("dashboard");
  });

  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  // POST Routes
  
  app.post("/signup", passport.authenticate("local-signup", {
    successRedirect: "/dashboard",
    failureRedirect: "/signup"
  })
  );

  app.post("/signin", passport.authenticate("local-signin", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin"
  })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/signin");
  };

};
