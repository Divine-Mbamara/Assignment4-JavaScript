//variables
var studentNum = document.getElementById("studentNum");
var city = document.getElementById("cityInput");
var weatherButton = document.getElementById("weatherButton");
var result = document.getElementById("weatherResult");
const tempSlider = document.getElementById("tempSlider");
const sliderValue = document.getElementById("sliderValue");

//function for the fetch request
function fetchWeatherFromAPI(){
    console.log("Inside get weather function");

    if(city.value === ""){
        alert("Please enter a city");
    }
    //create the base url
    let baseURL = "https://api.openweathermap.org/data/2.5/weather";
    //create apiKey
    let key = "33e86e2ee350fc90621bcebe91d5cabc";

    //create the dynamic URL
    let url = `${baseURL}?q=${city.value}&appid=${key}`;
    console.log(url);

    fetch(url)
    .then(response => response.json())
    .then(json => getWeather(json))
    .catch(() => {
        alert("Enter a valid city");
    });
}

//function to display weather
function getWeather(report){
    console.log(report);

    //clear previous result
    result.innerHTML = "";

    //create tags for display
    let resultHeader = document.createElement("h2");
    let temperature = document.createElement("p");
    let feelsLike = document.createElement("p");
    let description = document.createElement("p");
    let image = document.createElement("img");

    //extract the report values from the json file
    const countryCode = report.sys.country;
    const temp = (report.main.temp - 273.15).toFixed(1);
    const feels = (report.main.feels_like - 273.15).toFixed(1);
    const condition = report.weather[0].main;
    const desc = report.weather[0].description;
    const iconCode = report.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    //assign values to the created tags
    studentNum.textContent = "Divine Lotanna Mbamara | 200594413"
    resultHeader.textContent = `Weather Report in ${city.value}, ${countryCode}`;
    temperature.textContent = `Temperature: ${temp}°C`;
    feelsLike.textContent = `Feels Like: ${feels}°C`;
    description.textContent = `Description: ${condition} - ${desc}`;
    image.setAttribute("src", iconUrl);
    image.setAttribute("alt", "Weather Icon");

    //append elements to the weatherResult <div>
    result.appendChild(resultHeader);
    result.appendChild(temperature);
    result.appendChild(feelsLike);
    result.appendChild(description);
    result.appendChild(image);

    //Display styling for weatherResult
    result.style.display = "block";

    //update slider
    tempSlider.value = temp;
    sliderValue.textContent = `${temp}°C`;

    //Auto-change background color based on temperature
    let bgColor;
    const tempValue = parseFloat(temp);

    if (tempValue > 30){
        bgColor = "#ff3300"; // very hot - red
    }
    else if (tempValue > 20){
        bgColor = "#ff6600"; // warm - orange
    }
    else if (tempValue > 15){
        bgColor = "#ffcc66"; // mild - yellow-orange
    }
    else if (tempValue > 10){
        bgColor = "#ffff66"; // cool - yellow
    }
    else if (tempValue > 5){
        bgColor = "#ccff66"; // chilly - yellow-green
    }
    else if (tempValue > 0){
        bgColor = "#99ccff"; // cold - light blue
    }
    else{
        bgColor = "#66a3ff"; // very cold - deeper blue
    }
  
    // Set background color based on temp
    document.body.style.backgroundColor = bgColor;
}

//function for event listener on button
weatherButton.addEventListener("click", fetchWeatherFromAPI);
