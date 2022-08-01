//import './search.css';
import AsyncSelect from 'react-select/async';
//import Select from 'react-select';
import { useCallback } from 'react';
import { geoApiOptions, GEO_API_URL } from '../../api/api';
import { defaultSearchOptions } from './defaultSearchOptions';

const customStyles = {
    container: (provided) => ({
          ...provided,
             minWidth: '200px',
             maxWidth: '500px',
    //     zIndex: '100',
    //     position: 'absolute',
    //     marginTop: '3vh',
    //     marginLeft: '5%',
    //     //marginRight: 'auto',
    }),
    control: (provided, stateOfSearchBox) => ({
        ...provided,
        backgroundColor: stateOfSearchBox.isFocused ? 'rgba(200, 200, 200, 0.2)' : 'rgba(200, 200, 200, 0)',
        borderRadius: '0',
        borderColor: stateOfSearchBox.isFocused ? 'gray' : 'none',
        boxShadow: stateOfSearchBox.isFocused ? '0 0 0 1px gray' : 'none',
        borderWidth: '0px'
    }),
    indicatorSeparator: () => ({
        display: 'none'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: 'rgb(245, 245, 245)',
    }),
    option: (provided) => ({
        ...provided,
        color: 'gray',
        backgroundColor: 'rgb(245,245,245)'
    }),
    input: (provided) => ({
        ...provided,
        color: 'rgb(245, 245, 245)',
    }),
    singleValue: (provided) => ({
        ...provided,
        //fontSize: '1.5em',
        fontWeight: 'bold',
        color: 'rgb(245, 245, 245)',
    }),
};

export const Search = ({ handleCityChange }) => {

    //function getDataFromGeoDB with debouncing in order to do not ask api very often
    //but linter complain to 'useCallback' with empty []

    function debounce (fn, delay = 250) {
        // last answer in https://github.com/JedWatson/react-select/issues/614
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                fn(...args);
            }, delay);
        }
    }

    const getDataFromGeoDB = useCallback(debounce((search, callback) => 
        fetch( `${GEO_API_URL}/cities?limit=7&minPopulation=100000&namePrefix=${search}`, geoApiOptions)
	        .then(response => response.json())
	        .then(response => callback(response.data?.map(
                (responseElement) => ({ 
                    value: responseElement, 
                    label: `${responseElement.city} ${responseElement.countryCode}` 
                })
            )))
	        .catch(err => console.error(err))
    , 700), []
    );
    
    /*
    const getDataFromGeoDB = (search, callback) => { 
        fetch( `${GEO_API_URL}/cities?limit=7&minPopulation=100000&namePrefix=${search}`, geoApiOptions)
	        .then(response => response.json())
	        .then(response => callback(response.data?.map(
                (responseElement) => ({ 
                    value: responseElement, 
                    label: `${responseElement.city} ${responseElement.countryCode}` 
                }))));
    }
    */

    return (
            //<div className='search-container'>
                <AsyncSelect 
                    loadOptions={getDataFromGeoDB}
                    onChange={handleCityChange}
                    defaultValue={defaultSearchOptions[0]}
                    defaultOptions={defaultSearchOptions}
                    styles={customStyles}
                />
            //</div>
            );
}