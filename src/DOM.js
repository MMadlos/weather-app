import format from "date-fns/format"

export function setLocationToSearchBox(locationData) {
	const input = document.getElementById("searchbox")
	const { name, region, country } = locationData

	input.value = `${name}, ${region}, ${country}`
}

export function addCurrentWeatherDOM(currentWeatherInfo) {
	const todayImg = document.getElementById("today-img")
	const todayDate = document.getElementById("today-date")
	const todayCondition = document.getElementById("today-condition")
	const todayTemperature = document.getElementById("today-temperature")

	const { last_updated, temp_c, temp_f, text, icon } = currentWeatherInfo

	const [date, hour] = last_updated.split(" ")
	const newDate = new Date(date.split("-").join(", "))
	const dateFormatted = format(newDate, "EEEE, LLLL d")

	todayImg.src = icon
	todayDate.textContent = `Today, ${dateFormatted} (last update: ${hour} h)`
	todayCondition.textContent = text
	todayTemperature.textContent = `${temp_c}º`
}

export function addForecastWeatherTodayDOM(forecastWeather) {
	const todayMaxMinTemp = document.getElementById("today-maxmin-temp")

	const { maxtemp_c, maxtemp_f, mintemp_c, mintemp_f } = forecastWeather

	todayMaxMinTemp.textContent = `Max ${maxtemp_c}º - Min ${mintemp_c}º`
}

export function addNextDaysForecastWeatherDOM(index, forecastWeather) {
	const forecastInfoContainerAll = document.querySelectorAll("div.forecast-info-container")
	const forecastContainer = forecastInfoContainerAll[index]

	const dayEl = forecastContainer.querySelector(".day")
	const imgEl = forecastContainer.querySelector(".forecast-img")
	const maxTempEl = forecastContainer.querySelector(".max-temp-forecast")
	const minTempEl = forecastContainer.querySelector(".min-temp-forecast")

	const { date, icon, maxtemp_c, mintemp_c } = forecastWeather
	const dateObj = new Date(date.split("-").join(", "))

	const dayOfTheWeek = format(dateObj, "EEE")

	dayEl.textContent = dayOfTheWeek
	imgEl.src = icon
	maxTempEl.textContent = maxtemp_c
	minTempEl.textContent = mintemp_c
}
