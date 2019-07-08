document.addEventListener(
	"DOMContentLoaded",
	() => {
		console.log("IronGenerator JS imported successfully!");
	},
	false
);

let ingredientsList = document.getElementById("user_ingredients").ingredients;
let ingredients = [
	{
		text: "Onions",
		value: "onions"
	},
	{
		text: "Peppers (Green)",
		value: "Pepper green"
	},
	{
		text: "Mushrooms",
		value: "mushrooms"
	}
];

// ingredients.forEach(option =>
// 	ingredientsList.add(new Option(option.text, option.value))
// );

var option = '';
    for(var i = 0; i < ingredients.length; i++){
        option += '<option value="' + ingredients[i].value + '">' + ingredients[i].text + '</option>';
    }
    $("#user_ingredients").append(option);
