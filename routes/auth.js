const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");


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



// profile

router.get("/user-recipes", (req, res, next) => {
  Room.find()
    .then(rooms => {
      res.render("auth/user-recipes", { rooms });
    })
    .catch(err => {
      next(err);
    });
});

router.get("/user-recipes/:recipeId", (req, res, next) => {
  Recipe.findById(req.params.recipeId)
    .then(recipe => {
      res.render("auth/user-recipes", { recipe });
    })
    .catch(err => {
      next(err);
    });
});


router.get(
  "/user-recipes/:recipeId/delete",

  (req, res, next) => {
    const recipeId = req.params.recipeId;

    Room.deleteOne({ _id: recipeId })
      .then(data => {
        res.redirect("/auth/user-recipes");
      })
      .catch(err => {
        next(err);
      });
  }
);

router.post("/user-recipes", (req, res, next) => {
  const { name, ingredientsList, ingredientsFull, pasta, instructions, time, image } = req.body;

  console.log(req.user);

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
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      next(err);
    });
});


module.exports = router;
