// function nextDayWeatherHTMLTemplate({
//     dataType,
//     week,
//     date,
//     time,
//     icon,
//     temp,
//     humidity,
//     desc,
// }) {
//     return `
    //    <li class="weather-item">
    //         <a href="#" class="weather-item-link" data-type="${dataType}"></a>
    //         <ul class="forecast-list">
    //             <li class="weather-item-list">
    //                 <p class="next-date-weekday">${week}</p>
    //                 <p class="next-date-time">${date} at ${time}</p>
    //             </li>
    //             <li class="next-day-weather-list">
    //                 <img src="https://openweathermap.org/img/w/${icon}.png" alt="weather">
    //                 <p class="next-day-temperature">${temp}</p>
    //                 <p class="next-day-humidity">${humidity}</p>
    //                 <p class="next-day-humidity-description">${desc}</p>
    //             </li>
    //         </ul>
    //     </li>
//         `;
// }

// export function generateNextDayWeatherHTML(data) {
//     const container = document.querySelector(".forecast-container");
//     const indices = [1, 9, 17, 25, 33];


//     indices.forEach((index, i) => {
//         const date = new Date(data.list[index].dt_txt);
//         const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });

//         const formattedDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric' });
//         const time = date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
//         const dataTypes = ["today", "tomorrow", "dayAfterTomorrow", "dayAfterTomorrowAfter", "dayAfterTomorrowAfterTomorrow"];

//         const forecastItem = nextDayWeatherHTMLTemplate({
//             dataType: dataTypes[i],
//             week: dayOfWeek,
//             date: formattedDate,
//             time,
//             icon: data.list[indices[i]].weather[0].icon,
//             temp: `${data.list[index].main.temp.toFixed()} ℃`,
//             humidity: `${data.list[index].main.humidity} %`,
//             desc: data.list[index].weather[0].description,
//         });

//         container.innerHTML += forecastItem;
//     });
// }

const indices = [1, 9, 17, 25, 33];

export function getNextDay(data) {
    const currentDates = document.querySelectorAll(".next-date-weekday");

    indices.forEach((index, i) => {
        const date = new Date(data.list[index].dt_txt);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
        if (currentDates[i]) {
            currentDates[i].textContent = dayOfWeek;
        }
    });
}

export function getNextDayInfo(data) {
    const nextDays = document.querySelectorAll(".next-date-time");

    indices.forEach((index, i) => {
        const date = new Date(data.list[index].dt_txt);
        const formattedDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric' });
        const time = date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        if (nextDays[i]) {
            nextDays[i].textContent = `${formattedDate} at ${time}`;
        }
    });
}

export function getNextDayWeather(data) {
    const nextDayTemperature = document.querySelectorAll(".next-day-temperature");


    indices.forEach((index, i) => {
        if (nextDayTemperature[i]) {
            nextDayTemperature[i].textContent = `${data.list[index].main.temp.toFixed()} ℃`;
        }
    });
}

export function getNextDayHumidity(data) {
    const nextDayHumidity = document.querySelectorAll(".next-day-humidity");
    const nextDayHumidityDescription = document.querySelectorAll(".next-day-humidity-description");


    indices.forEach((index, i) => {
        if (nextDayHumidity[i]) {
            nextDayHumidity[i].textContent = `${data.list[index].main.humidity} %`;
        }
    });

    indices.forEach((index, i) => {
        if (nextDayHumidityDescription[i]) {
            nextDayHumidityDescription[i].textContent = data.list[index].weather[0].description;
        }
    });
}

export function showWeatherImg(data) {
    const nextDayWeatherList = document.querySelectorAll(".next-day-weather-img");

    nextDayWeatherList.forEach((element, i) => {
        const weatherImg = document.createElement("img");
        const icon = data.list[indices[i]].weather[0].icon;
        weatherImg.src = `https://openweathermap.org/img/w/${icon}.png`;
        element.prepend(weatherImg);
    });
}












