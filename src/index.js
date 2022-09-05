import './css/styles.css';
import { fetchCountries } from './fetchCountries';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let inputForSearch;
// ---------------Search form-----------------
const inputData = document.querySelector('#search-box');
const searchData = inputData.addEventListener(
  'input',
  debounce(getDataSearch, DEBOUNCE_DELAY)
);

function getDataSearch(data) {
  inputForSearch = data.target.value.trim();
  console.log(inputForSearch);
  if (inputForSearch !== '') {
    return fetchCountries(inputForSearch)
      .then(country => {
        console.log(country);
        console.log(country.status);
        if (country.length > 10) {
          showInfoNotification();
        }
        if (country.status === 404) {
          onError();
        }
        //   return country;
      })
      .catch(error => {});
  }
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function showInfoNotification() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}


function makeCountryMarkup()