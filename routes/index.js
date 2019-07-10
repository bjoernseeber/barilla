const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

/* GET home page */
router.get("/", (req, res, next) => {
	// res.render("index");

	Recipe.find({})
		.then(recipe => {
			const arrIngr = recipe.map(x => x.ingredientsList);
			const arrIngrFlat = [].concat.apply([], arrIngr);
			const objIngr = new Set(arrIngrFlat);
			const arrIngrNoDup = [...objIngr];

			// console.log(arrIngrNoDup);
			res.render("index", { arrIngrNoDup });
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

router.post("/ingredients/", (req, res) => {
	const search = req.body.userIngredientInput;
	const ownedArr = [];
	const toBuyArr = [];

	Recipe.find({ ingredientsList: { $in: search } })
		.then(recipes => {
			// res.redirect('ingredients')

			recipes.sort((a, b) => {
				const aScore = a.ingredientsList.filter(ingredient => {
					return search.includes(ingredient);
				}).length;

				const bScore = b.ingredientsList.filter(ingredient => {
					return search.includes(ingredient);
				}).length;

				return bScore - aScore;
			});

			const ingredientsArr = recipes.map(x => x.ingredientsList);
			const ingredientsArrFlat = [].concat.apply([], ingredientsArr);
			const ingredientsObj = new Set(ingredientsArrFlat);
			const recipeIngredients = [...ingredientsObj];

			console.log(recipeIngredients);

			recipeIngredients.forEach(x => {
				if (search.includes(x)) {
					ownedArr.push(x);
				} else {
					toBuyArr.push(x);
				}
			});
			console.log("to buy", toBuyArr);

			// console.log(search);
			// console.log(recipes.map(el => el.ingredientsList));
			console.log("owned", ownedArr);
			const slicedRecipes = recipes.slice(0, 3);

			res.render("ingredients", { slicedRecipes });
		})
		.catch(err => {
			console.log("Error while updating the recipe: ", err);
		});
});

module.exports = router;

//Not needed (?)
// router.get("/", (req, res, next) => {
// 	const resultsArr = [];
// 	Recipe.find({}).then(recipe => {
// 		recipe.forEach(doc, err => {
// 			resultsArr.push(doc);
// 		});
// 	});
// });\

// also not needed

// recipes.forEach(x => {
// 	x.ingredientsList.forEach(y =>{
// 		if(search.includes(y.ingredientsList(x))){
// 			ownedArr.push(x)}
// 			else {
// 				toBuyArr.push(x)
// 			}
// 	})
// 	})
