(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const c of e)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const c={};return e.integrity&&(c.integrity=e.integrity),e.referrerPolicy&&(c.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?c.credentials="include":e.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(e){if(e.ep)return;e.ep=!0;const c=i(e);fetch(e.href,c)}})();function x({week:r,date:n,time:i,icon:o,temp:e,humidity:c,desc:l}){return`
        <li class="hours-forecast-item">
            <ul class="hours-forecast-info-list">
                <li class="hours-forecast-info-dayandtime">
                    <p class="hours-forecast-weekday">${r}</p>
                    <p class="hours-forecast-time">${n} at ${i}</p>
                </li>
                <li class="hours-forecast-info-weather">
                    <img src="https://openweathermap.org/img/w/${o}.png" alt="weather">
                    <p class="hours-forecast-temperature">${e}</p>
                    <p class="hours-forecast-humidity">${c}</p>
                    <p class="hours-forecast-humidity-description">${l}</p>
                </li>
            </ul>
        </li>
    `}function L(r){const n=new Date,i=n.toLocaleDateString("en-US",{month:"long",day:"numeric"}),o=[];for(let s=0;s<5;s++){const m=new Date(n.getTime()+s*24*60*60*1e3);o.push(m.toLocaleDateString("en-US",{month:"long",day:"numeric"}))}const e=o.map(s=>({dateStr:s,html:""}));r.list.forEach(s=>{const m=new Date(s.dt_txt),t=m.toLocaleDateString("en-US",{month:"long",day:"numeric"}),d=o.indexOf(t);if(d!==-1){const a=m.toLocaleDateString("en-US",{weekday:"long"}),h=m.toLocaleString("en-US",{hour:"numeric",hour12:!0}),u=s.weather[0].icon,p=`${s.main.temp.toFixed()} ℃`,g=`${s.main.humidity} %`,S=s.weather[0].description,w=x({week:a,date:t,time:h,icon:u,temp:p,humidity:g,desc:S});e[d].html+=w}});const c=document.querySelectorAll(".weather-item-link"),l=document.querySelector(".hours-forecast-container");c.forEach(s=>{s.addEventListener("click",m=>{m.preventDefault();const t=s.getAttribute("data-type");l.style.display="flex";const d=e.find(a=>a.dateStr===i&&t==="today")||e.find(a=>a.dateStr===o[1]&&t==="tomorrow")||e.find(a=>a.dateStr===o[2]&&t==="dayAfterTomorrow")||e.find(a=>a.dateStr===o[3]&&t==="dayAfterTomorrowAfter")||e.find(a=>a.dateStr===o[4]&&t==="dayAfterTomorrowAfterTomorrow");l.innerHTML=d.html,l.scrollIntoView({behavior:"smooth"})})})}function $({week:r,date:n,time:i,city:o,country:e,temp:c,humidity:l,desc:s}){return`
            <ul class="current-weather-list">
                <li class="current-date">
                    <p class="current-date-weekday">${r}</p>
                    <p class="current-date-time">${n} at ${i}</p>
                </li>
                <div class="weather-container">
                    <li class="current-location">
                        <p class="current-city">${o}</p>
                        <span class="current-country">${e}</span>
                        <p class="current-location-temperature">${c}</p>
                    </li>
                    <li class="current-humidity">
                        <p class="current-humidity-percent">${l}</p>
                        <p class="current-humidity-description">${s}</p>
                    </li>
                </div>
            </ul>
    `}const D=document.querySelector(".forecast-item");function T(r){const n=new Date,i=$({week:n.toLocaleString("en-US",{weekday:"long"}),date:n.toLocaleString("en-US",{month:"long",day:"numeric"}),time:n.toLocaleString("en-US",{hour:"numeric",hour12:!0}),city:r.name+",",country:r.sys.country,temp:r.main.temp.toFixed()+" C",humidity:r.main.humidity+"%",desc:r.weather[0].description});D.insertAdjacentHTML("afterbegin",i)}const f=[1,9,17,25,33];function E(r){const n=document.querySelectorAll(".next-date-weekday");f.forEach((i,o)=>{const c=new Date(r.list[i].dt_txt).toLocaleString("en-US",{weekday:"long"});n[o]&&(n[o].textContent=c)})}function A(r){const n=document.querySelectorAll(".next-date-time");f.forEach((i,o)=>{const e=new Date(r.list[i].dt_txt),c=e.toLocaleString("en-US",{month:"long",day:"numeric"}),l=e.toLocaleString("en-US",{hour:"numeric",hour12:!0});n[o]&&(n[o].textContent=`${c} at ${l}`)})}function q(r){const n=document.querySelectorAll(".next-day-temperature");f.forEach((i,o)=>{n[o]&&(n[o].textContent=`${r.list[i].main.temp.toFixed()} ℃`)})}function H(r){const n=document.querySelectorAll(".next-day-humidity"),i=document.querySelectorAll(".next-day-humidity-description");f.forEach((o,e)=>{n[e]&&(n[e].textContent=`${r.list[o].main.humidity} %`)}),f.forEach((o,e)=>{i[e]&&(i[e].textContent=r.list[o].weather[0].description)})}function C(r){document.querySelectorAll(".next-day-weather-img").forEach((i,o)=>{const e=document.createElement("img"),c=r.list[f[o]].weather[0].icon;e.src=`https://openweathermap.org/img/w/${c}.png`,i.prepend(e)})}const y="8a2d489797ea17bf45b50d132dc3a98d",M="669ae02b8a4d0931372687cti43de51";function U(){const r=document.querySelector(".geo-coords-text"),n=document.querySelector(".geo-coords"),i=document.getElementById("cityInput"),o=document.getElementById("result"),e=()=>{const t=document.querySelector(".forecast-item"),d=document.querySelector(".hours-forecast-container");t.innerHTML="",d.innerHTML=""};function c(){document.querySelectorAll(".next-date-weekday").forEach(t=>t.innerHTML=""),document.querySelectorAll(".next-date-time").forEach(t=>t.innerHTML=""),document.querySelectorAll(".next-day-temperature").forEach(t=>t.innerHTML=""),document.querySelectorAll(".next-day-humidity").forEach(t=>t.innerHTML=""),document.querySelectorAll(".next-day-humidity-description").forEach(t=>t.innerHTML=""),document.querySelectorAll(".next-day-weather-img").forEach(t=>t.innerHTML="")}const l=(t,d)=>{axios.defaults.baseURL="https://api.openweathermap.org";const a=`/data/2.5/weather?lat=${t}&lon=${d}&units=metric&appid=${y}`,h=`/data/2.5/forecast?lat=${t}&lon=${d}&units=metric&appid=${y}`;axios.get(a).then(u=>{console.log(u.data),T(u.data)}),axios.get(h).then(u=>{console.log(u.data),L(u.data),E(u.data),A(u.data),q(u.data),H(u.data),C(u.data)})},s=t=>{const d=t.coords.latitude,a=t.coords.longitude;n.innerHTML=`${d.toFixed(4)} &nbsp; ${a.toFixed(4)}`,r.textContent="Geo Coords",l(d,a),console.log(`Latitude: ${d}, longitude: ${a}`)},m=()=>{const t=i.value,d=`https://geocode.maps.co/search?q=${encodeURIComponent(t)}&api_key=${M}`;fetch(d).then(a=>a.json()).then(a=>{if(a.length>0){e(),c();const{lat:h,lon:u}=a[0];n.innerHTML=`${parseFloat(h).toFixed(4)} &nbsp; ${parseFloat(u).toFixed(4)}`,r.textContent="Geo Coords",l(h,u)}else o.textContent="No results found"}).catch(a=>{console.error("Fetch error:",a),o.textContent="Error fetching geolocation"})};"geolocation"in navigator?navigator.geolocation.getCurrentPosition(s,t=>{console.log("Error getting user coordinates",t)}):console.error("Geolocation is not supported by this browser."),i.addEventListener("keydown",t=>{t.key==="Enter"&&m()})}U();
