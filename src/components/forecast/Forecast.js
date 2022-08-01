import './forecast.css';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import { ForecastElementHeader } from './forecast-element-header/ForecastElementHeader';
import { ForecastElementPanel } from './forecast-element-panel/ForecastElementPanel';

export function Forecast({ forecastData }) {

    return (
        <Accordion 
            allowZeroExpanded 
        >
            {forecastData.map((oneDayForecast) => (
                <AccordionItem 
                    key={oneDayForecast.datetimeStr}
                >
                    <AccordionItemHeading>
                        <AccordionItemButton >
                            <ForecastElementHeader oneDayForecast={oneDayForecast} />
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel >
                        <ForecastElementPanel oneDayForecast={oneDayForecast} />
                    </AccordionItemPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
}