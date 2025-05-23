const apiKey = '77fd6e365e9671282247eec3be1983d0';
const city = 'Westminster,US'; // Replace with your town/country

async function fetchWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();

    const temp = data.list[0].main.temp;
    const desc = data.list[0].weather[0].description;

    document.getElementById('temp').textContent = `Temperature: ${temp}°F`;
    document.getElementById('description').textContent = `Conditions: ${desc}`;

    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '<h3>3-Day Forecast</h3>';
    
    for (let i = 8; i <= 24; i += 8) {
      const dayData = data.list[i];
      const date = new Date(dayData.dt_txt);
      forecastDiv.innerHTML += `<p>${date.toLocaleDateString()}: ${dayData.main.temp}°F</p>`;
    }
  } catch (error) {
    console.error("Weather fetch failed:", error);
    document.getElementById('weather').innerHTML = '<p>Error loading weather data.</p>';
  }
}

fetchWeather();

