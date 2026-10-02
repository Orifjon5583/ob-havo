// 1. Asosiy o'zgaruvchilar va API sozlamalari
// OpenWeatherMap saytidan olingan API kalit va to'g'ri API URL manzili
const apiKey = "d6f4251b297f3eb0fd7307c0ac840de2"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// 2. HTML elementlarini JS dagi o'zgaruvchilarga bog'lash
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherBox = document.querySelector(".weather");
const errorBox = document.querySelector(".error");

// 3. Ob-havo ma'lumotlarini API'dan yuklab olish funksiyasi
async function checkWeather(city) {
    const trimmedCity = city.trim();

    // Agar qidiruv maydoni bo'sh bo'lsa, funksiyani to'xtatamiz
    if (!trimmedCity) {
        alert("Iltimos, shahar nomini kiriting!");
        return;
    }

    try {
        const response = await fetch(apiUrl + encodeURIComponent(trimmedCity) + `&appid=${apiKey}`);
        
        // Agar shahar topilmasa (404 xatosi)
        if (response.status === 404) {
            errorBox.style.display = "block";
            weatherBox.style.display = "none";
            return;
        }

        const data = await response.json();

        // Agar boshqa xatolik bo'lsa
        if (!response.ok) {
            alert(data.message || "Xatolik yuz berdi!");
            return;
        }

        console.log(data); // Konsolda kelgan ma'lumotlarni ko'rish uchun

        // HTML elementlariga ma'lumotlarni chiqarish
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Ob-havo holatiga qarab ikonkani o'zgartirish
        const condition = data.weather[0].main;
        if (condition === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (condition === "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (condition === "Rain" || condition === "Thunderstorm") {
            weatherIcon.src = "images/rain.png";
        } else if (condition === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (condition === "Mist" || condition === "Smoke" || condition === "Haze" || condition === "Fog") {
            weatherIcon.src = "images/mist.png";
        } else if (condition === "Snow") {
            weatherIcon.src = "images/snow.png";
        } else {
            weatherIcon.src = "images/clear.png";
        }

        // Ma'lumotlarni ko'rsatamiz va xatolik xabarini yashiramiz
        weatherBox.style.display = "block";
        errorBox.style.display = "none";

    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
    }
}

// 4. Qidiruv tugmasi bosilganda
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// 5. Qidiruv maydonida Enter tugmasi bosilganda
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
