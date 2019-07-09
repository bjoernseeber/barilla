document.addEventListener(
	"DOMContentLoaded",
	() => {
		console.log("IronGenerator JS imported successfully!");
	},
	false
);


let ingredients = [
	{
		text: "Onions",
		value: "onion"
	},
	{
		text: "Peas",
		value: "peas"
	},
	{
		text: "Mushrooms",
		value: "mushrooms"
	}
];

let option = "";
for (var i = 0; i < ingredients.length; i++) {
	option +=
		'<option value="' +
		ingredients[i].value +
		'">' +
		ingredients[i].text +
		"</option>";
}
$("#user-ingredients").append(option);


