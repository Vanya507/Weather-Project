function weatherHTMLTemplate({
    week,
    date,
    time,
    icon,
    temp,
    humidity,
    desc
}) {
    return `
        <li class="hours-forecast-item">
            <ul class="hours-forecast-info-list">
                <li class="hours-forecast-info-dayandtime">
                    <p class="hours-forecast-weekday">${week}</p>
                    <p class="hours-forecast-time">${date} at ${time}</p>
                </li>
                <li class="hours-forecast-info-weather">
                    <img src="https://openweathermap.org/img/w/${icon}.png" alt="weather">
                    <p class="hours-forecast-temperature">${temp}</p>
                    <p class="hours-forecast-humidity">${humidity}</p>
                    <p class="hours-forecast-humidity-description">${desc}</p>
                </li>
            </ul>
        </li>
    `;
}

export function generateForecastHTML(data) {

    const today = new Date();
    const todayDateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    const dateStrings = [];
    for (let i = 0; i < 5; i++) {
        const date = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000));
        dateStrings.push(date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }));
    }

    const forecastHTML = dateStrings.map(dateStr => {
        return {
            dateStr,
            html: ''
        };
    });

    data.list.forEach((item) => {
        const date = new Date(item.dt_txt);
        const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

        const dayIndex = dateStrings.indexOf(formattedDate);
        if (dayIndex !== -1) {
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
            const time = date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
            const icon = item.weather[0].icon;
            const temp = `${item.main.temp.toFixed()} ℃`;
            const humidity = `${item.main.humidity} %`;
            const desc = item.weather[0].description;

            const forecastItem = weatherHTMLTemplate({
                week: dayOfWeek,
                date: formattedDate,
                time,
                icon,
                temp,
                humidity,
                desc
            });

            forecastHTML[dayIndex].html += forecastItem;
        }
    });
const links = document.querySelectorAll(".weather-item-link");
const container = document.querySelector(".hours-forecast-container");
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const linkType = link.getAttribute('data-type');
        container.style.display = "flex";

        const targetHTML = forecastHTML.find(item => item.dateStr === todayDateStr && linkType === 'today') ||
            forecastHTML.find(item => item.dateStr === dateStrings[1] && linkType === 'tomorrow') ||
            forecastHTML.find(item => item.dateStr === dateStrings[2] && linkType === 'dayAfterTomorrow') ||
            forecastHTML.find(item => item.dateStr === dateStrings[3] && linkType === 'dayAfterTomorrowAfter') ||
            forecastHTML.find(item => item.dateStr === dateStrings[4] && linkType === 'dayAfterTomorrowAfterTomorrow');

        container.innerHTML = targetHTML.html;
        container.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
}
