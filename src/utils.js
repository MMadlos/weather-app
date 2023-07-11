const API_KEY = "48cedf39e2884af5955112026230307"
// const CITY = "Barcelona"

fetch(`https://api.weatherapi.com/v1/current.json?key=48cedf39e2884af5955112026230307&q=Barcelona`, { mode: "cors" }).then((response) =>
	console.log(response.json())
)

console.log("Hola")
