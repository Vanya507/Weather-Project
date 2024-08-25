import { generateForecastHTML } from './hours-info.js';
import { generateCurrentForecastHTML } from './currentday-info.js';
import { getNextDay, showWeatherImg, getNextDayHumidity, getNextDayWeather, getNextDayInfo } from './nextday-info.js';

const API_KEY = "8a2d489797ea17bf45b50d132dc3a98d";
const apiKey = '669ae02b8a4d0931372687cti43de51'; 

export function showUserCoordinates() {
    const geoCoordsText = document.querySelector(".geo-coords-text");
    const geoCoords = document.querySelector(".geo-coords");
    const cityInput = document.getElementById('cityInput');
    const result = document.getElementById('result');
    
    const clearWeatherInfo = () => {
        const container = document.querySelector(".forecast-item");
        const showContainer = document.querySelector(".hours-forecast-container");
        container.innerHTML = ''; 
        showContainer.innerHTML = '';
    };

    function clearWeatherData() {
        document.querySelectorAll(".next-date-weekday").forEach(el => el.innerHTML = "");
        document.querySelectorAll(".next-date-time").forEach(el => el.innerHTML = "");
        document.querySelectorAll(".next-day-temperature").forEach(el => el.innerHTML = "");
        document.querySelectorAll(".next-day-humidity").forEach(el => el.innerHTML = "");
        document.querySelectorAll(".next-day-humidity-description").forEach(el => el.innerHTML = "");
        document.querySelectorAll(".next-day-weather-img").forEach(el => el.innerHTML = "");
    }

    const fetchWeatherData = (lat, lon) => {
        axios.defaults.baseURL = 'https://api.openweathermap.org';
        const weatherUrl = `/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
        const forecastUrl = `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

        axios.get(weatherUrl).then(res => {
            console.log(res.data);
            generateCurrentForecastHTML(res.data);
        });

        axios.get(forecastUrl).then(res => {
            console.log(res.data);
            generateForecastHTML(res.data);
            getNextDay(res.data);
            getNextDayInfo(res.data);
            getNextDayWeather(res.data);
            getNextDayHumidity(res.data);
            showWeatherImg(res.data);
        });
    };

    const handleGeoSuccess = position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        geoCoords.innerHTML = `${lat.toFixed(4)} &nbsp; ${lon.toFixed(4)}`;
        geoCoordsText.textContent = "Geo Coords";
        fetchWeatherData(lat, lon);
        console.log(`Latitude: ${lat}, longitude: ${lon}`);
    };

    const getGeolocation = () => {
        const city = cityInput.value;
        const url = `https://geocode.maps.co/search?q=${encodeURIComponent(city)}&api_key=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    clearWeatherInfo(); // Clear old weather info before showing new
                    clearWeatherData();
                    const { lat, lon } = data[0];
                    geoCoords.innerHTML = `${parseFloat(lat).toFixed(4)} &nbsp; ${parseFloat(lon).toFixed(4)}`;
                    geoCoordsText.textContent = "Geo Coords";
                    fetchWeatherData(lat, lon);
                } else {
                    result.textContent = 'No results found';
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                result.textContent = 'Error fetching geolocation';
            });
    };

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, error => {
            console.log("Error getting user coordinates", error);
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }

    cityInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            getGeolocation();
        }
    });
}

