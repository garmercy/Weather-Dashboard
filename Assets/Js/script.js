const btnSearch = document.querySelector("#btnSearch");
const cityHistory = document.querySelector("#cityHistory");
const weatherIcon = document.querySelector(".weather-icon");
const apiKey = "d3d153c99b7719684bfe14f41dd76a7b";
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//This function call the api to check the city searched
async function chekingWeather (city){
    const response = await fetch (apiUrl + city +`&appid=${apiKey}`);
    var data = await response.json();
    
    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#wind").innerHTML = data.wind.speed + " km/h";

    var currentDateEl = $('#time');
    var todayDate = moment().format('(D/MM/YY)');
    currentDateEl.text(todayDate);
   
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

    document.querySelector("#containerForecast").style.display = "block";
}

btnSearch.addEventListener("click", ()=>{
    chekingWeather(inputSearch.value)+forecast(inputSearch.value);
})

// This function creates the forecast cards
function forecast(fore) {
 
    const apiUrl5 ="https://api.openweathermap.org/data/2.5/forecast?q=" + fore + "&appid=" + apiKey;

    $.ajax({ url: apiUrl5, type: "GET" }).then(function (response) {
      var list = response.list;
      
      //Using for to create the 5 weather cards
      $("#forecastList").html("");
      for (i=0;i<5;i++) {
        // Date,icon,temp,humidity and wind values
        let date = new Date(list[i].dt_txt);
        let iconId = list[i].weather[0].icon;
        let temp = ((list[i].main.temp - 273.15)).toFixed(2);
        let humidity = list[i].main.humidity;
        let wind = list[i].wind.speed;
        
        //Getting the date 
        let month = date.getMonth();
        let year = date.getFullYear();
        let dateForecast = `${month +1}/${year}`;
        console.log(dateForecast);

        //Creating cards in html
        let col = $("<div>");
        col.addClass("col");
        let forecard = $("<div>");
        forecard.addClass("card");

        //Adding date to html
        col.append(forecard);
        let p = $("<p>").text(dateForecast);

        // Calling img icon from the API and additing to html
        let imgUrl = "https://openweathermap.org/img/wn/" + iconId + "@2x.png";
        let weatherImage = $("<img>");

        //Adding temp,wind and humidity values to html 
        weatherImage.attr("src", imgUrl);
        var p1 = $("<p>").text("Temp: " + temp + "°C");
        var p2 = $("<p>").text("Humidity: " + humidity + "%");
        var p3 = $("<p>").text("Wind: " + wind + "km/h");
  
        // p,weatherImage appending to forecard
        forecard.append(p);
        forecard.append(weatherImage);
        forecard.append(p1);
        forecard.append(p2);
        forecard.append(p3);
  
        $("#forecastList").prepend(col);
      }
    });
  }