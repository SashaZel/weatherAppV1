import './current.css';

const getCurrentTemp = (weatherData) => {
    if (weatherData?.currentConditions.temp !== undefined) {
        return Math.round(weatherData.currentConditions.temp);
    }
    if (weatherData.values) {
        return Math.round(weatherData.values[0].temp);
    }
    return 'N/A ';
}

const getCurrentDescription = (weatherData) => {
    if (weatherData?.currentConditions?.datetime) {
        return weatherData?.currentConditions.icon.split('-').map(
            (word) => (
                <p key={word} className='current-weather-footer__conditions'>
                    {word.split('').map((letter, index) => index === 0 ? letter.toUpperCase() : letter)}
                </p>
            )
        );
    }
    if (weatherData.values) {
        return weatherData.values[0].conditions.split(' ').map(
            (word) => (
                <p key={word} className='current-weather-footer__conditions'>
                    {word}
                </p>
            ));
    }
    return 'no data';
}

const getCurrentWind = (weatherData) => {
    if (weatherData.currentConditions.datetime) {
        return typeof weatherData.currentConditions?.wspd === 'number' ? `Wind ${Math.round(weatherData.currentConditions.wspd)} km/h` : 'No wind';
    }
    if (weatherData.values) {
        return typeof weatherData.values[0]?.wspd === 'number' ? `Wind ${Math.round(weatherData.values[0].wspd)} km/h` : 'No wind';
    }
    return 'no data';
}

const getCurrentPercip = (weatherData) => {
    if (weatherData.values) {
        return typeof weatherData.values[0]?.precip === 'number' ? `Percipation ${Math.round(weatherData.values[0].precip)} mm` : 'No percipation';
    }
    return 'no data';
};

const getCurrentCloudCover = (weatherData) => {
    if (weatherData.currentConditions.datetime) {
        return typeof weatherData.currentConditions?.cloudcover === 'number' ? `Cloudcover ${Math.round(weatherData.currentConditions.cloudcover)} %` : 'No clouds';
    }
    if (weatherData.values) {
        return typeof weatherData.values[0]?.cloudcover === 'number' ? `Cloudcover ${Math.round(weatherData.values[0].cloudcover)} %` : 'No clouds';
    }
    return 'no data';
}

const getCurrentHumidity = (weatherData) => {
    if (weatherData.currentConditions.datetime) {
        return typeof weatherData.currentConditions?.humidity === 'number' && `Humidity ${Math.round(weatherData.currentConditions?.humidity)}%`;
    }
    if (weatherData.values) {
        return typeof weatherData.values[0]?.humidity === 'number' && `Humidity ${Math.round(weatherData.values[0].humidity)}%`;
    }
    return 'no data';
}

const dateFormatter = {
    'daysOfWeek': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'month': ['Jan. ', 'Feb. ', 'March ', 'April ', 'May ', 'June ', 'July ', 'Aug. ', 'Sept. ', 'Oct. ', 'Nov. ', 'Dec. ']
}

const getHeader = (weatherData) => {
    if (weatherData.currentConditions.datetime) {
        const dateNow = new Date(weatherData.currentConditions?.datetime);
        return (
            <div className='current-weather-header__right-child'>
                <p>{dateFormatter.daysOfWeek[dateNow.getDay()]} {dateNow.getDate()}</p>
                <p>{String(dateNow.getHours()).padStart(2, '0')}:{String(dateNow.getMinutes()).padStart(2, '0')}</p>
            </div>
        );
    }
    if (weatherData.values) {
        const dateFromForecast = new Date(weatherData.values[0].datetime)
        return (
            <div className='current-weather-header__right-child'>
                <p>{dateFormatter.daysOfWeek[dateFromForecast.getDay()]} {dateFromForecast.getDate()}</p>
                <p>Weather today</p>
            </div>
        );
    }
    return 'no data';
}

export function Current({ weatherData, mainTheme, children }) {
    return (

        // TODO: make time indication 00:00 not 0:0

        <div className={`current-weather ${mainTheme}`}>
            <div className='current-weather-header'>
                {children}
                {getHeader(weatherData)}
            </div>
            <div className='current-weather-footer'>
                <div className='current-weather-footer__container conteiner-margin'>
                    <p className='current-weather-footer__temp'>{getCurrentTemp(weatherData)}°C</p>
                    <div>
                        {getCurrentDescription(weatherData)}
                    </div>
                </div>
                <div className='current-weather-footer__container'>
                    <p>{getCurrentWind(weatherData)}</p>
                    <p>{getCurrentPercip(weatherData)}</p>
                </div>
                <div className='current-weather-footer__container font-bold'>
                    <p>{getCurrentCloudCover(weatherData)}</p>
                    <p>{getCurrentHumidity(weatherData)}</p>
                </div>
            </div>
        </div>
    );
}