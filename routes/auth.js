const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Recipe = require("../models/Recipe");


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/profile",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


// Protected area

const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.redirect("/auth/login");
  };
};



router.get("/profile", loginCheck(), (req, res) => {
    res.render("auth/profile", { user: req.user});
});

router.get("/add-recipe", loginCheck(), (req, res) => {
  res.render("auth/add-recipe", { user: req.user});
});

router.get("/user-recipes", loginCheck(), (req, res) => {
  res.render("auth/user-recipes", { user: req.user});
});



// User recipes

router.post("/add-recipe", (req, res, next) => {
  let { name, ingredientsList,ingredientsFull, pasta, instructions, time, image } = req.body;
  
  ingredientsList=ingredientsList.split(",")
  ingredientsFull=ingredientsFull.split(",")


  Recipe.create({
    name,
    ingredientsList,
    ingredientsFull,
    pasta,
    instructions,
    time,
    image,
    owner: req.user._id
  })
  .then((recipe) => {
    console.log(recipe)
      res.redirect("/auth/profile");
    })
    .catch(err => {
      next(err);
    });
});





module.exports = router;
