import { generateForecastHTML } from './hours-info.js'
import { generateCurrentForecastHTML} from './currentday-info.js';
import { getNextDay, showWeatherImg, getNextDayHumidity, getNextDayWeather, getNextDayInfo } from './nextday-info.js';

const API_KEY = "8a2d489797ea17bf45b50d132dc3a98d";

export function showUserCoordinates() {
    const geoCoordsText = document.querySelector(".geo-coords-text");
    const geoCoords = document.querySelector(".geo-coords");
    // Check if geolocation is supported by the browser
    if ("geolocation" in navigator) {
        // Prompt user for permission to access their location
        navigator.geolocation.getCurrentPosition(
            // Success callback function
            function (position) {
                // Get the user's latitude and longitude coordinates
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                geoCoords.textContent = `${lat.toFixed(4)} ${lng.toFixed(4)}`;
                geoCoordsText.textContent = "Geo Coords";


                axios.defaults.baseURL = 'https://api.openweathermap.org'

                axios.get(`/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`)
                    .then(res => {
                        console.log(res.data);
                        generateCurrentForecastHTML(res.data);
                    });

                axios.get(`/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`)
                    .then(res => {
                        console.log(res.data)
                        getNextDayInfo(res.data);
                        showWeatherImg(res.data);
                        getNextDay(res.data);
                        getNextDayWeather(res.data);
                        getNextDayHumidity(res.data);

                        generateForecastHTML(res.data);
                    });

                // Update the map with the user's new location
                console.log(`Latitude: ${lat}, longitude: ${lng}`);
            },
            function (error) {
                console.log("Error getting user coordinates", error);
            }
        );
    } else {
        // Geolocation is not supported by the browser
        console.error("Geolocation is not supported by this browser.");
    }
}
