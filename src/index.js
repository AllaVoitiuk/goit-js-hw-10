import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 1000;

import { fetchCountries } from "./fetchcountries";

let country = "ukraine";

let refs = {
    input: document.querySelector("#search-box"),
    ul: document.querySelector("country-list"),
    div: document.querySelector ("country-info"),
}


const debounceLoad = debounce(onInputChange, DEBOUNCE_DELAY);

refs.input.addEventListener("input", debounceLoad);



function onInputChange (event) {  
   // event.preventDefault(); 
    let inputValue = refs.input.value
    
    inputValue = inputValue.trim();
    console.log("Країна: " + inputValue);

    if(inputValue){
        fetchCountries(inputValue)
        .then(data => {
            console.log(data);
            console.log("data.length: " + data.length);
            //if (data.length > 2 && data.length < 10) {
            if (data.length === 1) {
                Notiflix.Notify.success(`success`);
                //const {results: dataArray} = data;
                const markupDiv = data.map(item => `
                    <li>
                        <img src=${item.flags.svg} alt="">
                        <p>NAME: ${item.name.official}</p>
                        <p>capital: ${item.capital}</p>
                        <p>population: ${item.population}</p>
                        <p>languages: ${getLanguages(item.languages)}</p>
                    </li>
                `).join('');

                //console.log(getLanguages(data[0].languages));

                // <img src=${item.img} alt="">
                //         <p>NAME: ${item.name}</p>
                
                document.querySelector('.country-info').innerHTML += markupDiv
            //})
            }
            if (data.length > 10) {
                console.log("Too many matches found. Please enter a more specific name.");
                Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);   
            }

            if (data.length === 0){
                Notiflix.Notify.failure(`Oops, there is no country with that name`);
            }
        });
        /*.catch((data.length === 0) => {
            
            Notiflix.Notify.failure(`Oops, there is no country with that name`);
          }); */
    }
}

function getLanguages(languages){
    
    let allLanguages = "";
    let i=0;

    for (let lng in languages)
    {   
        if(i > 0){
            allLanguages += ", ";
        }   
        allLanguages += languages[lng];
        i++;
    }
    return allLanguages;
}


/*function getData(){
        fetch('https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages')
            .then(response => response.json())
            .then(data => {
                const {results: dataArray} = data
                const markup = dataArray.map(item => `
        <li>
            <img src=${item.img} alt="">
            <p>NAME: ${item.name}</p>
            <p>capital: ${item.capital}</p>
            <p>population: ${item.population}</p>
            <p>languages: ${item.languages}</p>
           
        </li>
    `).join('')
                document.querySelector('.country-list').innerHTML += markup
            })
    }
    getData()*/

//
// 
{/* <li>
<img src=${item.img} alt="">
<p>NAME: ${item.name}</p>
<p>capital: ${item.capital}</p>
<p>population: ${item.population}</p>
<p>languages: ${item.languages}</p>

</li> */}
