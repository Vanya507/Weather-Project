function currentWeatherHTMLTemplate({
  week,
  date,
  time,
  city,
  country,
  temp,
  humidity,
  desc,
}) {
  return `
            <ul class="current-weather-list">
                <li class="current-date">
                    <p class="current-date-weekday">${week}</p>
                    <p class="current-date-time">${date} at ${time}</p>
                </li>
                <div class="weather-container">
                    <li class="current-location">
                        <p class="current-city">${city}</p>
                        <span class="current-country">${country}</span>
                        <p class="current-location-temperature">${temp}</p>
                    </li>
                    <li class="current-humidity">
                        <p class="current-humidity-percent">${humidity}</p>
                        <p class="current-humidity-description">${desc}</p>
                    </li>
                </div>
            </ul>
    `;
}

const container = document.querySelector(".forecast-item");
export function generateCurrentForecastHTML(data) {
  const now = new Date();

  const forecastItem = currentWeatherHTMLTemplate({
    week: now.toLocaleString("en-US", { weekday: "long" }),
    date: now.toLocaleString("en-US", { month: "long", day: "numeric" }),
    time: now.toLocaleString("en-US", { hour: "numeric", hour12: true }),
    city: data.name + ",",
    country: data.sys.country,
    temp: data.main.temp.toFixed() + " C",
    humidity: data.main.humidity + "%",
    desc: data.weather[0].description,
  });
  container.insertAdjacentHTML("afterbegin", forecastItem);
}
