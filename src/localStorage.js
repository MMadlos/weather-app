import differenceInMinutes from "date-fns/differenceInMinutes"

function getLocalStorage() {
	const localData = localStorage.getItem("weatherData")
	const weatherData = JSON.parse(localData)
	return weatherData
}

function addToLocalStorage(weatherData) {
	localStorage.setItem("weatherData", JSON.stringify(weatherData))
}

export function getPreviouslocationLocalStorage() {
	const weatherData = getLocalStorage()
	if (!weatherData) return null

	const { name, region, country } = weatherData.location
	return `${name}, ${region}, ${country}`
}

function checkIfLocalStorageIsUpdated() {
	const localWeatherData = getLocalStorage()
	if (!localWeatherData) return false

	const { last_updated } = localWeatherData.current

	const lastUpdate = new Date(last_updated)
	const now = new Date()
	const minutesBetween = differenceInMinutes(now, lastUpdate)

	const isUpdated = minutesBetween < 15 ? true : false

	return isUpdated
}

function checkLocalStorageConditions(location) {
	const isLocalStorageData = getLocalStorage() ? true : false
	if (!isLocalStorageData) return false

	const isLocalStorageUpdated = checkIfLocalStorageIsUpdated()
	if (!isLocalStorageUpdated) return false

	const city = location.split(",")[0] || location
	const localStorage = getLocalStorage()
	const locationStorage = localStorage.location.name
	const isSameLocation = locationStorage === city ? true : false

	return isSameLocation ? true : false
}

export { getLocalStorage, addToLocalStorage, checkLocalStorageConditions }
