import './forecast-element-panel.css';

export function ForecastElementPanel ({ oneDayForecast }) {
    return (
        <div className='forecast-element-panel'>
            <div className='forecast-element-panel-line'>
                <p className='forecast-element-panel-line_cild'>Max {typeof oneDayForecast?.maxt === 'number' && Math.round(oneDayForecast.maxt)}°C</p>
                <p className='forecast-element-panel-line_cild'>{typeof oneDayForecast?.pop === 'number' && Math.round(oneDayForecast.pop)}% Precipitation</p>
            </div>
            <div className='forecast-element-panel-line bold-font'>
                <p className='forecast-element-panel-line_cild'>Min {typeof oneDayForecast?.mint === 'number' && Math.round(oneDayForecast.mint)}°C</p>
                <p className='forecast-element-panel-line_cild'>{typeof oneDayForecast?.wspd === 'number' && Math.round(oneDayForecast.wspd)} km/h Wind</p>
            </div>
            <div className='forecast-element-panel-line'>
                <p className='forecast-element-panel-line_cild'>{oneDayForecast?.conditions}</p>
                <p className='forecast-element-panel-line_cild'>{typeof oneDayForecast?.humidity === 'number' && Math.round(oneDayForecast.humidity)}% Humidity</p>
            </div>
        </div>
    );
} 