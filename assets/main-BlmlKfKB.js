(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&e(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function e(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();function x({week:r,date:n,time:a,icon:e,temp:t,humidity:o,desc:i}){return`
        <li class="hours-forecast-item">
            <ul class="hours-forecast-info-list">
                <li class="hours-forecast-info-dayandtime">
                    <p class="hours-forecast-weekday">${r}</p>
                    <p class="hours-forecast-time">${n} at ${a}</p>
                </li>
                <li class="hours-forecast-info-weather">
                    <img src="https://openweathermap.org/img/w/${e}.png" alt="weather">
                    <p class="hours-forecast-temperature">${t}</p>
                    <p class="hours-forecast-humidity">${o}</p>
                    <p class="hours-forecast-humidity-description">${i}</p>
                </li>
            </ul>
        </li>
    `}function $(r){const n=new Date,a=n.toLocaleDateString("en-US",{month:"long",day:"numeric"}),e=[];for(let c=0;c<5;c++){const d=new Date(n.getTime()+c*24*60*60*1e3);e.push(d.toLocaleDateString("en-US",{month:"long",day:"numeric"}))}const t=e.map(c=>({dateStr:c,html:""}));r.list.forEach(c=>{const d=new Date(c.dt_txt),l=d.toLocaleDateString("en-US",{month:"long",day:"numeric"}),m=e.indexOf(l);if(m!==-1){const s=d.toLocaleDateString("en-US",{weekday:"long"}),h=d.toLocaleString("en-US",{hour:"numeric",hour12:!0}),p=c.weather[0].icon,y=`${c.main.temp.toFixed()} ℃`,g=`${c.main.humidity} %`,w=c.weather[0].description,S=x({week:s,date:l,time:h,icon:p,temp:y,humidity:g,desc:w});t[m].html+=S}});const o=document.querySelectorAll(".weather-item-link"),i=document.querySelector(".hours-forecast-container");o.forEach(c=>{c.addEventListener("click",d=>{d.preventDefault();const l=c.getAttribute("data-type");i.style.display="flex";const m=t.find(s=>s.dateStr===a&&l==="today")||t.find(s=>s.dateStr===e[1]&&l==="tomorrow")||t.find(s=>s.dateStr===e[2]&&l==="dayAfterTomorrow")||t.find(s=>s.dateStr===e[3]&&l==="dayAfterTomorrowAfter")||t.find(s=>s.dateStr===e[4]&&l==="dayAfterTomorrowAfterTomorrow");i.innerHTML=m.html,i.scrollIntoView({behavior:"smooth"})})})}function L({week:r,date:n,time:a,city:e,country:t,temp:o,humidity:i,desc:c}){return`
        <li class="forecast-item">
            <ul class="current-weather-list">
                <li class="current-date">
                    <p class="current-date-weekday">${r}</p>
                    <p class="current-date-time">${n} at ${a}</p>
                </li>
                <div class="weather-container">
                    <li class="current-location">
                        <p class="current-city">${e}</p>
                        <span class="current-country">${t}</span>
                        <p class="current-location-temperature">${o}</p>
                    </li>
                    <li class="current-humidity">
                        <p class="current-humidity-percent">${i}</p>
                        <p class="current-humidity-description">${c}</p>
                    </li>
                </div>
            </ul>
        </li>
    `}const D=document.querySelector(".forecast-container");function T(r){const n=new Date,a=L({week:n.toLocaleString("en-US",{weekday:"long"}),date:n.toLocaleString("en-US",{month:"long",day:"numeric"}),time:n.toLocaleString("en-US",{hour:"numeric",hour12:!0}),city:r.name+",",country:r.sys.country,temp:r.main.temp.toFixed()+" C",humidity:r.main.humidity+"%",desc:r.weather[0].description});D.insertAdjacentHTML("afterbegin",a)}const u=[1,9,17,25,33];function A(r){const n=document.querySelectorAll(".next-date-weekday");u.forEach((a,e)=>{const o=new Date(r.list[a].dt_txt).toLocaleString("en-US",{weekday:"long"});n[e]&&(n[e].textContent=o)})}function C(r){const n=document.querySelectorAll(".next-date-time");u.forEach((a,e)=>{const t=new Date(r.list[a].dt_txt),o=t.toLocaleString("en-US",{month:"long",day:"numeric"}),i=t.toLocaleString("en-US",{hour:"numeric",hour12:!0});n[e]&&(n[e].textContent=`${o} at ${i}`)})}function E(r){const n=document.querySelectorAll(".next-day-temperature");u.forEach((a,e)=>{n[e]&&(n[e].textContent=`${r.list[a].main.temp.toFixed()} ℃`)})}function U(r){const n=document.querySelectorAll(".next-day-humidity"),a=document.querySelectorAll(".next-day-humidity-description");u.forEach((e,t)=>{n[t]&&(n[t].textContent=`${r.list[e].main.humidity} %`)}),u.forEach((e,t)=>{a[t]&&(a[t].textContent=r.list[e].weather[0].description)})}function q(r){document.querySelectorAll(".next-day-weather-list").forEach((a,e)=>{const t=document.createElement("img"),o=r.list[u[e]].weather[0].icon;t.src=`https://openweathermap.org/img/w/${o}.png`,a.prepend(t)})}const f="8a2d489797ea17bf45b50d132dc3a98d";function b(){const r=document.querySelector(".geo-coords-text"),n=document.querySelector(".geo-coords");"geolocation"in navigator?navigator.geolocation.getCurrentPosition(function(a){const e=a.coords.latitude,t=a.coords.longitude;n.textContent=`${e.toFixed(4)} ${t.toFixed(4)}`,r.textContent="Geo Coords",axios.defaults.baseURL="https://api.openweathermap.org",axios.get(`/data/2.5/weather?lat=${e}&lon=${t}&units=metric&appid=${f}`).then(o=>{console.log(o.data),T(o.data)}),axios.get(`/data/2.5/forecast?lat=${e}&lon=${t}&units=metric&appid=${f}`).then(o=>{console.log(o.data),C(o.data),q(o.data),A(o.data),E(o.data),U(o.data),$(o.data)}),console.log(`Latitude: ${e}, longitude: ${t}`)},function(a){console.log("Error getting user coordinates",a)}):console.error("Geolocation is not supported by this browser.")}b();
