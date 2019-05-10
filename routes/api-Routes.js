var db = require("../models");
var passport = require("../config/passport");


module.exports = function(app) {

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/serviceboard");
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      skills: req.body.skills,
      availability: req.body.availability
    })
      .then(function() {
        res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      res.json({});
    }
    else {
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/service", function(_req, res) {
    db.Service.findAll({})
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post("/api/service", function(req, res) {
    db.Service.create(req.body)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(error) {
        res.json({ error: error });
      });
  });
};
