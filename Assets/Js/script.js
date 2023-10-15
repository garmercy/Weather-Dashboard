const inputSearch = document.querySelector("#inputSearch");
const btnSearch = document.querySelector("#btnSearch");
const cityHistory = document.querySelector("#cityHistory");
const weatherIcon = document.querySelector(".weather-icon");
const apiKey = "d3d153c99b7719684bfe14f41dd76a7b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
//https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=d3d153c99b7719684bfe14f41dd76a7b&units=metric

//this function call the api
async function chekingWeather (city){
    const response = await fetch (apiUrl + city +`&appid=${apiKey}`);
    var data = await response.json();
    
    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "Assets/Css/Images/clouds.png";
    }else if(data.weather[0].main == "Clear")
    weatherIcon.src = "Assets/Css/Images/clear.png";
    else if(data.weather[0].main == "Rain")
    weatherIcon.src = "Assets/Css/Images/rain.png";
    else if(data.weather[0].main == "Drizzle")
    weatherIcon.src = "Assets/Css/Images/drizzle.png";
    else if(data.weather[0].main == "Mist")
    weatherIcon.src = "Assets/Css/Images/mist.png";
    //missing to check the right name "storm"
    else if(data.weather[0].main == "Storm")
    weatherIcon.src = "Assets/Css/Images/storm.png";
}

btnSearch.addEventListener("click", ()=>{
    chekingWeather(inputSearch.value);
})


// const containerCityWeather = document.querySelector("#containerCityWeather");
//------------------------------------------------------------------
// const cityName = document.querySelector("#city");
// const temperature = document.querySelector("#temperature");
// const humidity = document.querySelector("#humidity");
// const wind = document.querySelector("#wind");
//-------------------------------------------------------------------
// const forecastList = document.querySelector("#forecastList");