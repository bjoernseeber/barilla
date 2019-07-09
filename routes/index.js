const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

/* GET home page */
router.get("/", (req, res, next) => {
	res.render("index");
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

router.post("/ingredients", (req, res) => {
	const search = req.body.userIngredientInput;
	Recipe.findMany({ ingredientsList: search })
		.then(recipe => {
			console.log(recipe)
		})
		.catch(err => {
			console.log("Error while updating the book: ", err);
		});
	console.log(search);
});

// router.get('/ingredients', (req, res) => {
// 	res.render('ingredients')
// })

module.exports = router;
