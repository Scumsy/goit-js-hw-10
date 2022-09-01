import './css/styles.css';
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
    getDataFromServer(inputForSearch);
  }
}

function getDataFromServer(input) {
  fetch(`https://restcountries.com/v2/name/${input}`)
    .then(res => {
      return res.json();
    })
    .then(country => {
      console.log(country);
      if (country.length > 10) {
        showInfoNotification();
        return;
      }
      return country;
    });
}

function showInfoNotification() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
