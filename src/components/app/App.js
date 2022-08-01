import { useEffect, useState } from "react";
import { Spinner } from "../spinner/Spinner";
import { Search } from "../search/Search";
import { Current } from "../current/Current"
import { getVisualCrossingWeatherOptions, VISUAL_WEATHER_API } from "../../api/api"
import { Forecast } from "../forecast/Forecast";
import { Footer } from "../footer/Footer";
import './app.css';

// block code below and fix 'useEffect' befo prod build
//import { TEMP_CITY_DATA, TEMP_WEATHER_DATA } from '../../api/temp_data';

export function App() {
    //const [city, setCity] = useState();
    const [weatherData, setWeatherData] = useState();
    const [mainTheme, setMainTheme] = useState('theme-cloudy-day');

    const handleCityChange = ({ value, _ }) => {
        //setCity(value);
        getForecast(value);
        //console.log(city);
    }

    const handleThemeChange = (weatherResponse) => {
        let condit = 'cloudy';
        let dayNight = 'day';
        if (weatherResponse?.currentConditions?.datetime < weatherResponse?.currentConditions?.sunrise || 
            weatherResponse?.currentConditions?.datetime > weatherResponse?.currentConditions?.sunset) {
                dayNight = 'night';
            }
        if (weatherResponse.values[0].pop > 30) {
            condit = 'rain';
        }
        if (weatherResponse.values[0].snow > 1) {
            condit = 'snow';
        }
        if (weatherResponse.values[0].cloudcover < 20) {
            condit = 'clear';
        }
        return `theme-${condit}-${dayNight}`;
    }

    // Krasnoyarsk 56.008888888,92.871944444
    const getForecast = (city) => {
        if (!city) return;
        const latitudeLongitude = `${city.latitude},${city.longitude}`;
        fetch(`${VISUAL_WEATHER_API}&location=${latitudeLongitude}&contentType=json&unitGroup=metric&shortColumnNames=0`, getVisualCrossingWeatherOptions)
            .then(response => response.json())
            .then(response => {
                setWeatherData(response.locations[latitudeLongitude]);
                setMainTheme(handleThemeChange(response.locations[latitudeLongitude]));
            })
            .catch(err => console.error(err));
        //console.log(weatherData);
    }

    useEffect(() => {
        
        handleCityChange({
            value: {
            city: "Krasnoyarsk",
            country: "Russia",
            countryCode: "RU",
            id: 104295,
            latitude: 56.008888888,
            longitude: 92.871944444,
        }, 
            label: '_'});
       /* 
       ===========================================
        In order to do not overuse API during development
        I add these temp data.
        Important! Before prod build remove 'setCity' and 'setWeatherData' 
        below and unblock code above
        ===========================================
        
        setCity(TEMP_CITY_DATA);
        setWeatherData(TEMP_WEATHER_DATA);
        */
}, []);

return (
    <div className="container">
        {
            weatherData ?
                <Current 
                    weatherData={weatherData} 
                    mainTheme={mainTheme}
                >
                    <Search handleCityChange={handleCityChange} />
                </Current>
                : <div className="current-weather-loading">
                    <Spinner />
                    <h5>...Current weather loading</h5>
                </div>
        }
        <div className='forecast-container'>
            {weatherData ?
                <Forecast forecastData={weatherData.values} className='forecast-container'/>
                : <div className="forecast-loading">
                    <Spinner />
                    <h5>...Forecast loading</h5>
                </div>}
        </div>
        <Footer mainTheme={mainTheme} />
    </div>
);
}