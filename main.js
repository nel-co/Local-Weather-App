var icon;
var loc;
var temp;
var weatherType;
var url = 'http://api.openweathermap.org/data/2.5/weather?';
var APPID = '&appid=4c07edd502cf88c09f0753bbfb01d15a';

var showPosition = function (position) {
	updateByGeo(position.coords.latitude, position.coords.longitude);
}

function updateByGeo(lat, lon) {
	var url = 'http://api.openweathermap.org/data/2.5/weather?' + APPID +
		"&lat=" + lat +
		"&lon=" + lon;
	sendRequest(url);
}

function sendRequest(url) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var data = JSON.parse(xmlhttp.responseText);
			var weather = {};
			weather.loc = data.name + ", " + data.sys.country;
			weather.temp = data.main.temp;
			weather.weatherType = data.weather[0].description;
			weather.icon = data.weather[0].icon;
			update(weather);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function update(weather) {
	loc.innerHTML = weather.loc;
	icon.innerHTML = weather.icon;
	weatherType.innerHTML = weather.weatherType;
	temp.innerHTML = Math.round(weather.temp * (9 / 5) - 459.67) + '&deg F';
	
	/* Start of Toggle */
	var isCel = false;
	temp.addEventListener('click', function() {
		if(isCel) {
			temp.innerHTML = Math.round(weather.temp * (9 / 5) - 459.67) + '&deg F';
			temp.style.color = 'firebrick';
			isCel = false;
		} else {
			temp.innerHTML = Math.round(weather.temp - 273.15) + '&deg C';
			temp.style.color = 'darkcyan';
			isCel = true;
		}
	});	
	/* End of Toggle */
	
	/* Weather Icons Start */
	switch (icon.innerHTML) {
		case "11d": // Thunder
			icon.innerHTML = '<span class="entypo-cloud-thunder"></span>';
			break;		
		case "13d": // Snow
			icon.innerHTML = '<span class="entypo-logo-db"></span>';
			break;
		case "09d": // Rain
		case "10d":
		case "13d":
			icon.innerHTML = '<span class="entypo-water"></span>';
			break;
		case "01d": // Clear Sky
			icon.innerHTML = '<span class="entypo-light-up"></span>';
			break;
		case "01n": // Clear Night
			icon.innerHTML = '<span class="entypo-moon"></span>';
			break;
		case  "02d": // Clouds
		case  "02n":
		case  "03d":
		case  "03n":
		case  "04d":
			icon.innerHTML = '<span class="entypo-cloud"></span>';
			break;		
		case  "50d": // Atmosphere
			icon.innerHTML = '<span class="entypo-air"></span>';
			break;
		
	}
	/* Weather Icons End */
}

window.onload = function () {
	icon = document.getElementById("icon");
	loc = document.getElementById("loc");
	temp = document.getElementById("temp");
	weatherType = document.getElementById("weather-type");
	
	var tut = document.querySelector('.convertText');


	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		alert("Could not discover location. Browser outdated.")
	}

	temp.addEventListener('click', function() {
		tut.style.display = 'none';
	})
	
}