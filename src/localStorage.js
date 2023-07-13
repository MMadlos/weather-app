import differenceInMinutes from "date-fns/differenceInMinutes"

function getLocalStorage() {
	const localData = localStorage.getItem("weatherData")
	const weatherData = JSON.parse(localData)
	return weatherData
}

function addToLocalStorage(weatherData) {
	localStorage.setItem("weatherData", JSON.stringify(weatherData))
}

function checkIfLocalStorageIsUpdated() {
	const localWeatherData = getLocalStorage()

	const { last_updated } = localWeatherData.current

	const [date, hour] = last_updated.split(" ")
	const lastUpdate = new Date(`${date}T${hour}`)
	const now = new Date()

	const minutesBetween = differenceInMinutes(now, lastUpdate)
	const isUpdated = minutesBetween < 15 ? true : false

	return isUpdated
}

function checkLocalStorageConditions() {
	const isLocalStorageData = getLocalStorage() ? true : false
	const isLocalStorageUpdated = checkIfLocalStorageIsUpdated()

	const meetConditions = isLocalStorageData && isLocalStorageUpdated ? true : false

	return meetConditions
}

export { getLocalStorage, addToLocalStorage, checkLocalStorageConditions }
