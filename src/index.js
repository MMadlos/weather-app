import "./styles.css"
const API_KEY = "48cedf39e2884af5955112026230307"
const CITY = "Barcelona"
const isDataInLocalStorage = localStorage.getItem("weatherData") ? true : false

displayWeatherApp()
function displayWeatherApp() {
	if (!isDataInLocalStorage) {
		fetchAndAddWeatherDOM()
		addToLocalStorage()
	}
	if (isDataInLocalStorage) {
		const localWeatherData = JSON.parse(localStorage.getItem("weatherData"))
		fetchAndAddWeatherDOM(localWeatherData)
	}
}

async function addToLocalStorage() {
	const weatherData = await fetchWeatherData()
	localStorage.setItem("weatherData", JSON.stringify(weatherData))
}

async function fetchAndAddWeatherDOM(dataFromLocal) {
	const weatherData = dataFromLocal ? dataFromLocal : await fetchWeatherData()

	const currentWeatherInfo = getCurrentWeatherInfo(weatherData)
	const forecastToday = getForecastWeather(0, weatherData)

	addCurrentWeatherDOM(currentWeatherInfo)
	addForecastWeatherTodayDOM(forecastToday)

	// For the next 3 days
	for (let i = 1; i <= 3; i++) {
		// In (i) days
		const forecastInfo = getForecastWeather(i, weatherData)
		addNextDaysForecastWeatherDOM(forecastInfo)
	}
}

async function fetchWeatherData() {
	const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=7&aqi=no&alerts=no`, { mode: "cors" })
	const weatherData = await response.json()
	console.log(weatherData)
	return weatherData
}

function getCurrentWeatherInfo(weatherData) {
	const data = weatherData.current
	const { last_updated, temp_c, temp_f } = data
	const { text, icon } = data.condition

	const currentWeatherInfo = { last_updated, temp_c, temp_f, text, icon }
	return currentWeatherInfo
}

// Check last update and location
function getLocationAndLastUpdate(weatherData) {
	const { name, region, country } = weatherData.location
	const { last_updated } = weatherData.current

	const info = { name, region, country, last_updated }
	return info
}

function addCurrentWeatherDOM(currentWeatherInfo) {
	const todayImg = document.getElementById("today-img")
	const todayDate = document.getElementById("today-date")
	const todayCondition = document.getElementById("today-condition")
	const todayTemperature = document.getElementById("today-temperature")

	const { last_updated, temp_c, temp_f, text, icon } = currentWeatherInfo

	todayImg.src = icon
	todayDate.textContent = last_updated
	todayCondition.textContent = text
	todayTemperature.textContent = `${temp_c}º`
}

function getForecastWeather(dayIndex, weatherData) {
	//dayIndex is the position of the day in the array. Today = 0, Tomorrow = 1, the day after tomorrow = 2, etc.
	const { date, date_epoch } = weatherData.forecast.forecastday[dayIndex]
	const { maxtemp_c, maxtemp_f, mintemp_c, mintemp_f } = weatherData.forecast.forecastday[dayIndex].day
	const { icon, text } = weatherData.forecast.forecastday[dayIndex].day.condition

	const forecastWeather = { date, date_epoch, maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, icon, text }

	return forecastWeather
}

function addForecastWeatherTodayDOM(forecastWeather) {
	const todayMaxMinTemp = document.getElementById("today-maxmin-temp")

	const { maxtemp_c, maxtemp_f, mintemp_c, mintemp_f } = forecastWeather

	todayMaxMinTemp.textContent = `Max ${maxtemp_c}º - Min ${mintemp_c}º`
}

function addNextDaysForecastWeatherDOM(forecastWeather) {
	const forecastInfoContainerAll = document.querySelectorAll("div.forecast-info-container")
	forecastInfoContainerAll.forEach((element) => {
		const dayEl = element.querySelector(".day")
		const imgEl = element.querySelector(".forecast-img")
		const maxTempEl = element.querySelector(".max-temp-forecast")
		const minTempEl = element.querySelector(".min-temp-forecast")

		const { date, icon, maxtemp_c, mintemp_c } = forecastWeather

		dayEl.textContent = date
		imgEl.src = icon
		maxTempEl.textContent = maxtemp_c
		minTempEl.textContent = mintemp_c
	})
}

// // CURRENT CODE

// checkLastUpdated()
// async function checkLastUpdated() {
// 	const currentLastUpdated = await getLastUpdate()

// 	if (lastUpdated !== currentLastUpdated) console.log({ lastUpdated, currentLastUpdated })
// 	if (lastUpdated === currentLastUpdated) console.log("YES")
// }

// async function getForecast() {
// 	const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=7&aqi=no&alerts=no`, { mode: "cors" })
// 	const data = await response.json()

// const { name, region, country } = weatherData.location

// // DOM for today
// const input = document.getElementById("searchBox")
// input.value = `${name}, ${region}, ${country}`
