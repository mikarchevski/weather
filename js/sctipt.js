function detectLocation(callback) {
    const apiURL = `http://ip-api.com/json/`;
    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw Error('response not ok');
            }
            return response.json();
        })
        .then(data => callback(data))
        .catch(error => console.error('Ошибка при получении геолокации:', error));
}


function getWeather(location) {
    let customerCity = document.querySelector('.weather__form-place-town');
    customerCity.textContent = location.city
    const apiKey = 'a68e418a69464d08afa91952241402'
    let weatherBtn = document.querySelector('.weather__form-fields-btn');
    let wetherDeg = document.querySelector('.weather__form-info-deg');
    let wetherFeelslike = document.querySelector('.weather__form-info-feelslike');
    let wetherWind = document.querySelector('.weather__form-info-wind');
    let weatherIcon = document.querySelector('.weather__form-info-icon');
    let weatherDescription = document.querySelector('.weather__form-info-desc');
    let weatherInfoForm = document.querySelector('.weather__form-info');
    console.log(location.city);
    
    const city = location.city;
    function weatherRequest(city){
        let apiURL = `https://api.weatherapi.com/v1/current.json?q=${city}&Key=${apiKey}`;
        fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw Error('response not ok');
            }
            return response.json();
        }
        )
        .then(data => {
            const { current: { temp_c, feelslike_c, wind_kph, gust_kph, condition: { text, icon } } } = data;
            weatherIcon.src = icon;
            weatherDescription.textContent = text;
            wetherDeg.innerHTML = +temp_c + "°C";
            wetherFeelslike.textContent = " " + feelslike_c + "°C";
            wetherWind.textContent = " " + wind_kph + " kph";
            weatherInfoForm.classList.add('weather__form-info--show');
        })
        .catch(error => {
            // Обработка возможной ошибки
            console.error('There was a problem with your fetch operation:', error);
        });
        
    }
    weatherRequest(city);
    weatherBtn.addEventListener('click', function(){
        let customerCity = document.querySelector('.weather__form-place-town');
        let cityName = document.querySelector('.weather__form-fields-city').value;
        if (cityName === ''){
            const city = location.city;
            customerCity.textContent = location.city;
            weatherRequest(city);
        } else{
            const city = cityName.toString();
            
            customerCity.textContent = cityName;
            weatherRequest(city);
        }
       
    });
    
}
detectLocation(getWeather);