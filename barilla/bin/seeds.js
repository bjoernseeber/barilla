const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");


mongoose.connect("mongodb://localhost/barilla", {
  useNewUrlParser: true
});

const recipes = [
  {
    name: "SPAGHETTI WITH EGGPLANT, ZUCCHINI",
    ingredientsList: [zucchini, chives, garlic, eggplant, parmiggiano],
    ingredientsFull: ["1 zucchini sliced in half moons", "2 tablespoon chives chopped", "2 cloves garlic chopped", "2 cups eggplant diced", "½ cup Parmigiano Reggiano cheese shredded"],
    pasta: "Spaghetti",
    instructions: "Bring a large pot of water to a boil. In a large skillet cook the garlic in olive oil for about 2 minutes or until slightly yellow in color. Add eggplant, sauté for 3 minutes.",
    time: 10,
    image: "",
  },
];


Recipe.insertMany(recipes)
  .then(data => {
    console.log(`Created ${data.length} recipes`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log("Error while creating the recipes: ", err);
  });

