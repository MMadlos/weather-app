import format from "date-fns/format"

export function setLocationToSearchBox(locationData) {
	const input = document.getElementById("searchbox")
	const cityName = document.getElementById("city")

	const { name, region, country } = locationData

	input.value = `${name}, ${region}, ${country}`
	cityName.textContent = `${name}, ${region}, ${country}`
}

export function addCurrentWeatherDOM(currentWeatherInfo, tempScale) {
	const todayImg = document.getElementById("today-img")
	const todayDate = document.getElementById("today-date")
	const todayCondition = document.getElementById("today-condition")
	const todayTemperature = document.getElementById("today-temperature")

	const { last_updated, temp_c, temp_f, text, icon } = currentWeatherInfo

	const isTempScaleCels = tempScale === "C"

	const temp = isTempScaleCels ? temp_c : temp_f
	const hour = last_updated.split(" ")[1]
	const dateFormatted = format(new Date(last_updated), "EEEE, LLLL d")

	todayImg.src = icon
	todayDate.textContent = `Today, ${dateFormatted} (last update: ${hour} h)`
	todayCondition.textContent = text
	todayTemperature.textContent = `${temp} º${tempScale}`
}

export function addForecastWeatherTodayDOM(forecastWeather, tempScale) {
	const todayMaxMinTemp = document.getElementById("today-maxmin-temp")

	const { maxtemp_c, maxtemp_f, mintemp_c, mintemp_f } = forecastWeather
	const isTempScaleCels = tempScale === "C"

	const maxTemp = isTempScaleCels ? maxtemp_c : maxtemp_f
	const minTemp = isTempScaleCels ? mintemp_c : mintemp_f

	todayMaxMinTemp.textContent = `Max ${maxTemp}º - Min ${minTemp}º`
}

export function addNextDaysForecastWeatherDOM(index, forecastWeather, tempScale) {
	const forecastInfoContainerAll = document.querySelectorAll("div.forecast-info-container")
	const forecastContainer = forecastInfoContainerAll[index]

	const dayEl = forecastContainer.querySelector(".day")
	const imgEl = forecastContainer.querySelector(".forecast-img")
	const maxTempEl = forecastContainer.querySelector(".max-temp-forecast")
	const minTempEl = forecastContainer.querySelector(".min-temp-forecast")

	const { date, icon, maxtemp_c, mintemp_c, maxtemp_f, mintemp_f } = forecastWeather

	const isTempScaleCels = tempScale === "C"
	const maxTemp = isTempScaleCels ? maxtemp_c : maxtemp_f
	const minTemp = isTempScaleCels ? mintemp_c : mintemp_f

	const dayOfTheWeek = format(new Date(date), "EEE")

	dayEl.textContent = dayOfTheWeek
	imgEl.src = icon
	maxTempEl.textContent = maxTemp
	minTempEl.textContent = minTemp
}

// |-- LOADER
const loader = document.querySelector("#loading")
const todayContainer = document.getElementById("today-container")
const forecastContainer = document.getElementById("forecast-container")

// Hide elements except loader
// showing loading
export function displayLoading() {
	loader.classList.remove("hide")
}

export function hideLoading() {
	loader.classList.add("hide")
	// loader.classList.remove("display")
}

export function hideData() {
	todayContainer.classList.add("hide")
	forecastContainer.classList.add("hide")
}

export function displayData() {
	todayContainer.classList.remove("hide")
	forecastContainer.classList.remove("hide")
}

// --|
