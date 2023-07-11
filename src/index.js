import "./styles.css"
const API_KEY = "48cedf39e2884af5955112026230307"
const CITY = "Barcelona"

const weatherDataLocalStorage = localStorage.getItem("weatherData")
const weatherData = JSON.parse(weatherDataLocalStorage)

async function getForecast() {
	const API_KEY = "48cedf39e2884af5955112026230307"
	const CITY = "Barcelona"

	const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=7&aqi=no&alerts=no`, { mode: "cors" })
	const data = await response.json()

	localStorage.setItem("weatherData", JSON.stringify(data))
}

if (!weatherDataLocalStorage) getForecast()
if (weatherDataLocalStorage) console.log(weatherData)

// Datos que necesito de la API
/*
Buscador:
    location.name
    location.region
    location.country

    const {name, region, country} = weatherData.location

Datos de hoy:
    current
        .temp_c
        .temp_f
        .condition.text
        .condition.icon

    forecast 
        .forecastday[0] //* HOY
            .maxtemp_c
            .maxtemp_f
            .mintemp_c
            .mintemp_f
            .condition.text
            .condition.icon
        .forecastday[1] //* MAÑANA
            .maxtemp_c
            .maxtemp_f
            .mintemp_c
            .mintemp_f
            .condition.icon
        .forecastday[2] //* PASADO MAÑANA
            .maxtemp_c
            .maxtemp_f
            .mintemp_c
            .mintemp_f
            .condition.icon
*/

// Localización
const { name, region, country } = weatherData.location
console.log({ name, region, country })

// Data for Today
const currentWeather = weatherData.current
const dateLastUpdated = currentWeather.last_updated
const tempCNow = currentWeather.temp_c
const tempFNow = currentWeather.temp_f
const conditionNow = currentWeather.condition.text
const iconNow = currentWeather.condition.icon

const forecastToday = weatherData.forecast.forecastday[0].day
const maxTempNowCels = forecastToday.maxtemp_c
const maxTempNowFahr = forecastToday.maxtemp_f
const minTempNowCels = forecastToday.mintemp_c
const minTempNowFahr = forecastToday.mintemp_f

const todayImg = document.getElementById("today-img")
const todayDate = document.getElementById("today-date")
const todayCondition = document.getElementById("today-condition")
const todayTemperature = document.getElementById("today-temperature")
const todayMaxMinTemp = document.getElementById("today-maxmin-temp")

todayImg.src = iconNow
todayDate.textContent = dateLastUpdated
todayCondition.textContent = conditionNow
todayTemperature.textContent = `${tempCNow}º`
todayMaxMinTemp.textContent = `Max ${maxTempNowCels}º - Min ${minTempNowCels}º`

// Tomorrow
const forecastTomorrow = weatherData.forecast.forecastday[1].day
const maxTempTomorrowCels = forecastTomorrow.maxtemp_c
const maxTempTomorrowFahr = forecastTomorrow.maxtemp_f
const minTempTomorrowCels = forecastTomorrow.mintemp_c
const minTempTomorrowFahr = forecastTomorrow.mintemp_f

console.log(forecastTomorrow)
