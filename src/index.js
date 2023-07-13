import "./styles.css"
import { addForecastWeatherTodayDOM, addCurrentWeatherDOM, setLocationToSearchBox, addNextDaysForecastWeatherDOM } from "./DOM"
import { getLocalStorage, addToLocalStorage, checkLocalStorageConditions } from "./localStorage"

const input = document.getElementById("searchbox")
const btnSearch = document.getElementById("btn-search")

const API_KEY = "48cedf39e2884af5955112026230307"
const CITY = searchBoxEventListener()

function searchBoxEventListener() {
	btnSearch.addEventListener("click", () => input.value)

	input.addEventListener("keydown", (e) => {
		if (e.key !== "Enter") return
		return input.value
	})
	return "Barcelona"
}

fetchAndPrintWeather()
async function fetchAndPrintWeather() {
	const weatherData = checkLocalStorageConditions() ? getLocalStorage() : await fetchWeatherData()

	const locationData = getLocationData(weatherData)
	const currentWeatherInfo = getCurrentWeatherInfo(weatherData)
	const forecastToday = getForecastWeather(0, weatherData)

	setLocationToSearchBox(locationData)
	addCurrentWeatherDOM(currentWeatherInfo)
	addForecastWeatherTodayDOM(forecastToday)

	const numberOfDaysToForecast = 3
	for (let i = 1; i <= numberOfDaysToForecast; i++) {
		// In (i) days
		const forecastInfo = getForecastWeather(i, weatherData)
		addNextDaysForecastWeatherDOM(i - 1, forecastInfo)
	}

	if (!checkLocalStorageConditions) addToLocalStorage(weatherData)
}

async function fetchWeatherData() {
	const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=7&aqi=no&alerts=no`, { mode: "cors" })
	const weatherData = await response.json()
	return weatherData
}

function getLocationData(weatherData) {
	const { name, region, country } = weatherData.location
	return { name, region, country }
}

function getCurrentWeatherInfo(weatherData) {
	const data = weatherData.current
	const { last_updated, temp_c, temp_f } = data
	const { text, icon } = data.condition

	return { last_updated, temp_c, temp_f, text, icon }
}

function getForecastWeather(dayIndex, weatherData) {
	//dayIndex -> Today = 0, Tomorrow = 1, the day after tomorrow = 2, etc.
	const forecastDay = weatherData.forecast.forecastday[dayIndex]
	const { date, date_epoch } = forecastDay
	const { maxtemp_c, maxtemp_f, mintemp_c, mintemp_f } = forecastDay.day
	const { icon, text } = forecastDay.day.condition

	return { date, date_epoch, maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, icon, text }
}
