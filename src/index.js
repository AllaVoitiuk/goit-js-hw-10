import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from "./fetchcountries";

const DEBOUNCE_DELAY = 300;
let country = "ukraine";

let refs = {
    input: document.querySelector("#search-box"),
    ul: document.querySelector("country-list"),
    div: document.querySelector ("country-info"),
}

const debounceLoad = debounce(onInputChange, DEBOUNCE_DELAY);
refs.input.addEventListener("input", debounceLoad);

function onInputChange (event) {  
   event.preventDefault(); 
    let inputValue = refs.input.value;
   
    inputValue = inputValue.trim();
    clearInfo();
    if(inputValue){
     fetchCountries(inputValue)
        .then(data => {
            console.log("data.length: " + data.length);
         
            if (data.length === 1) {
                Notiflix.Notify.success(`success`);
                const markupDiv = data.map(item => `
                    
                    <h2> <img src=${item.flags.svg} alt="">
                         ${item.name.official}</h2>
                        <p><b>capital:</b> ${item.capital}</p>
                        <p><b>population:</b> ${item.population}</p>
                        <p><b>languages:</b> ${getLanguages(item.languages)}</p>
                  
                `).join(''); 
                           
                document.querySelector('.country-info').innerHTML = markupDiv
            }

            if (data.length >= 2 && data.length < 10) {
       
                const markupUl = data.map(item => `
                <li>
                 <img src=${item.flags.svg} alt="">
                     ${item.name.official}  
                </li>              
            `).join(''); 
            
            document.querySelector('.country-list').innerHTML = markupUl;
            }
            
            if (data.length > 10) {
               
                Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);   
            }

            if (data.length === undefined){
                Notiflix.Notify.failure(`Oops, there is no country with that name`);
            }
        })         
    }
}

function getLanguages(languages){
    
    let allLanguages = "";
    let i=0;

    for (let lng in languages){   
        if(i > 0){
            allLanguages += ", ";
        }   
        allLanguages += languages[lng];
        i++;
    }
    return allLanguages;
}

function clearInfo() {
    document.querySelector('.country-list').innerHTML = "";   
    document.querySelector('.country-info').innerHTML = "";
}

