const express = require('express');
const router  = express.Router();
const Recipe = require("../models/Recipe");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/recipes", (req, res) => {
	Recipe.find({})
		.then(recipes => {
			res.render("recipes", { recipes });
		})
		.catch(err => {
			console.log("Error while retrieving the recipes: ", err);
		});
});

console.log()

module.exports = router;
