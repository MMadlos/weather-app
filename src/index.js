import "./styles.css"
import {
	addForecastWeatherTodayDOM,
	addCurrentWeatherDOM,
	setLocationToSearchBox,
	addNextDaysForecastWeatherDOM,
	displayLoading,
	hideLoading,
	hideData,
	displayData,
} from "./DOM"
import { getLocalStorage, addToLocalStorage, checkLocalStorageConditions, getPreviouslocationLocalStorage } from "./localStorage"

const API_KEY = "48cedf39e2884af5955112026230307"
const defaultLocation = getPreviouslocationLocalStorage() || "Barcelona, Catalonia"
const defaultScale = getScaleSelected()

printWeather(defaultLocation, defaultScale)

function printWeather(location, tempScale) {
	fetchAndPrintWeather(location, tempScale)
	searchBoxEventListener()
	toggleScale()
}

function toggleScale() {
	const switchScale = document.getElementById("switch-scale")
	const selectedScale = switchScale.querySelector(".selected")
	const notSelectedScale = switchScale.querySelector("p:not(.selected)")

	notSelectedScale.addEventListener("click", () => {
		selectedScale.classList.remove("selected")
		notSelectedScale.classList.add("selected")

		const currentLocation = document.getElementById("searchbox").value
		const scaleClicked = getScaleSelected()

		printWeather(currentLocation, scaleClicked)
	})
}

function getScaleSelected() {
	const switchScale = document.getElementById("switch-scale")
	const getSelected = switchScale.querySelector(".selected")
	return getSelected.textContent.charAt(1)
}

function searchBoxEventListener() {
	const input = document.getElementById("searchbox")
	const btnSearch = document.getElementById("btn-search")

	btnSearch.addEventListener("click", () => {
		if (input.value === "") return
		const location = input.value
		input.blur()

		fetchAndPrintWeather(location, getScaleSelected())
	})

	input.addEventListener("keydown", (e) => {
		if (e.key !== "Enter") return
		const location = input.value
		input.blur()

		fetchAndPrintWeather(location, getScaleSelected())
	})
}

async function fetchAndPrintWeather(location, tempScale) {
	displayLoading()
	hideData()

	const weatherData = checkLocalStorageConditions(location) ? getLocalStorage() : await fetchWeatherData(location)

	const locationData = getLocationData(weatherData)
	const currentWeatherInfo = getCurrentWeatherInfo(weatherData)
	const forecastToday = getForecastWeather(0, weatherData)

	setLocationToSearchBox(locationData)
	addCurrentWeatherDOM(currentWeatherInfo, tempScale)
	addForecastWeatherTodayDOM(forecastToday, tempScale)

	const numberOfDaysToForecast = 3
	for (let i = 1; i <= numberOfDaysToForecast; i++) {
		// In (i) days
		const forecastInfo = getForecastWeather(i, weatherData)
		addNextDaysForecastWeatherDOM(i - 1, forecastInfo, tempScale)
	}

	setTimeout(() => {
		hideLoading()
		displayData()
	}, 2500)

	console.log(checkLocalStorageConditions(location))
	if (!checkLocalStorageConditions(location)) addToLocalStorage(weatherData)
}

async function fetchWeatherData(location) {
	const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no`, { mode: "cors" })
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
