const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

/* GET home page */
router.get("/", (req, res, next) => {
	// res.render("index");

	Recipe.find({})
	.then(recipe => {
		const arrIngr = recipe.map(x=>x.ingredientsList)		
		const arrIngrFlat = [].concat.apply([], arrIngr)
		const objIngr = new Set(arrIngrFlat);
		const arrIngrNoDup = [...objIngr]
		console.log("hello", arrIngrNoDup);
		res.render('index',{ arrIngrNoDup })

	})
	.catch(err => {
		console.log("Error while updating the book: ", err);
	});
	
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
	Recipe.find({ ingredientsList: { $all: search } })
		.then(recipe => {
			
			console.log(recipe);
		})
		.catch(err => {
			console.log("Error while updating the recipe: ", err);
		});
	console.log(search);
});

router.get("/", (req, res, next) => {
	const resultsArr = [];
	Recipe.find({}).then(recipe => {
		recipe.forEach(doc, err => {
			resultsArr.push(doc);
		});
	});
});

module.exports = router;
