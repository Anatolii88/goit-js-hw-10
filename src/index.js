import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
var _ = require('lodash');
const DEBOUNCE_DELAY = 300;



const countriesEl = document.querySelector('.country-list')
const countriesInfoEl = document.querySelector('.country-info')
const inputEl = document.querySelector('#search-box')
inputEl.addEventListener('input', onInput)


function onInput(e) { 
  e.preventDefault()
  let value = e.currentTarget.value.trim();
  if (value === '') {
    countriesEl.innerHTML = ''
    countriesInfoEl.innerHTML = ''
  } else { 
    fetchCountries(value)
    .then(renderReguestCountry)
  }
}

function renderReguestCountry(country) {
  if (country.length > 10) {
    countriesEl.innerHTML = ''
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");

  } else if (country.length === 1) {

    const arrayCountries = country.map((element, index, array) => {
      const languages = Object.values(element.languages).join(',')
      const country = `<ul class="country-info-list"><li><span class="text">Capital:</span> ${element.capital[0]}</li><li><span class="text">Population:</span> ${element.population}</li><li><span class="text">Languages:</span> ${languages}</li></ul>`;
      countriesInfoEl.innerHTML = country;
      return `<li><div class="country"><img class="img" src="${element.flags.svg}" alt=""><p class="country-name"  >${element.name.common}</p></div>
      </li>`;
    })
    return countriesEl.innerHTML = arrayCountries;

  } else if (country.length >= 2 || country.length <= 10) {
    countriesInfoEl.innerHTML = ''
    const arrayCountries = country.map((element, index, array) => {
      return `<li><div class='country'><img class="img" src="${element.flags.svg}" alt=""><p class='country-name'>${element.name.common}</p></div></li>`;
    }).join('')
    
    return countriesEl.innerHTML = arrayCountries;

  } else { 
    Notiflix.Notify.failure('Oops, there is no country with that name');
    countriesEl.innerHTML = ''
  }
 
}