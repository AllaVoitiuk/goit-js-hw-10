let country = "ukraine";

// function fetchCountries(name){
//     fetch(`https://restcountries.com/v3.1/name/${name}`)
//     .then(response => response.json()).then(data => console.log(data))
// }
// fetchCountries(country);

function fetchCountries(name){
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
     .then(response => response.json());
    // .then(data => console.log(data))
    /*return new Promise((resolve, reject) => {
     
        if (shouldResolve) {
        resolve({data});      
        } 
        else {
        reject({data});      
        }
    });*/
}
//fetchCountries(country);



export { fetchCountries };