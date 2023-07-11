import "./styles.css"
const API_KEY = "48cedf39e2884af5955112026230307"
const CITY = "Barcelona"

async function getForecast() {
	const API_KEY = "48cedf39e2884af5955112026230307"
	const CITY = "Barcelona"

	const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=7&aqi=no&alerts=no`, { mode: "cors" })
	const data = await response.json()

	console.log(data)
}

getForecast()
