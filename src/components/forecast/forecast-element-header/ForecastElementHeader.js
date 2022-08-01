import './forecast-element-header.css';

const dateFormatter = {
    'daysOfWeek': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    'month': ['Jan. ', 'Feb. ', 'March ', 'April ', 'May ', 'June ', 'July ', 'Aug. ', 'Sept. ', 'Oct. ', 'Nov. ', 'Dec. ']
}

const choiseIcon = (oneDayForecast) => {
    if (oneDayForecast.wgust > 40) return 'icon_14.png';
    if (oneDayForecast.mint < -20) return 'icon_11.png';
    if (oneDayForecast.snow) return 'icon_10.png';
    if (oneDayForecast.pop > 70) return 'icon_06.png';
    if (oneDayForecast.pop > 30) return 'icon_05.png';
    if (oneDayForecast.windspeed > 14) return 'icon_12.png';
    if (oneDayForecast.conditions === 'Clear') return 'icon_01.png';
    if (oneDayForecast.cloudcover > 80) return 'icon_02.png';
    if (oneDayForecast.conditions === "Partially cloudy") return 'icon_03.png';
    if (oneDayForecast.conditions === "Overcast") return 'icon_02.png';
    if (oneDayForecast.cloudcover > 20) return 'icon_03.png';
    return 'icon_na.png';
}

export function ForecastElementHeader({ oneDayForecast }) {
    const dateFromTime = new Date(oneDayForecast.datetime);

    return (
        <div 
            className='forecast-element-header'
        >
            <div className='forecast-element-header__left-child'>
                <p>
                    <strong>{dateFormatter.daysOfWeek[dateFromTime.getDay()]}  </strong>
                </p>
                <p>
                    {dateFormatter.month[dateFromTime.getMonth()]}
                    {dateFromTime.getDate()}
                </p>
                
            </div>
            <div className='forecast-element-header__right-child'>
                <p>{typeof oneDayForecast?.temp === 'number' && Math.round(oneDayForecast.temp)}°C</p>
                <img 
                    className='icon-small'
                    alt='weather icon' 
                    src={`pictures/forecast-icons/${choiseIcon(oneDayForecast)}`}
                ></img>
            </div>
        </div>
    );
}