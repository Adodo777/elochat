const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../models/users");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", (req, res) => {
  Users.findOne({ user: req.body.username }, (err, user) => {
    if (err) throw err;
    if (user) {
      res.render("register", {
        errorMessage: "Ce pseudo est déjà utilisé",
      });
      return;
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) throw err;

      const user = new Users({
        user: req.body.username,
        genre: req.body.genre,
        password: hash,
      });

      try {
        user.save();
        res.render("index", {
          successMessage:
            "Merci de votre inscription, vous pouvez désormais vous connecter !",
        });
      } catch (err) {
        console.log(err);
      }
    });
  });
});

router.get("/inscription", (req, res) => {
  res.render("register");
});

router.get("/chat", (req, res) => {
  res.redirect("/");
});

router.post("/chat", (req, res) => {
  Users.findOne({ user: req.body.username }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.render("index", {
        errorMessage: "Vos identifiants sont incorrects",
      });
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {

        if (err) throw err;
        if (!result) {
          res.render("index", {
            errorMessage: "Vos identifiants sont incorrects",
          });
        } else {
          res.render("chat", user);
        }
      });
    }
  });
});
module.exports = router;
