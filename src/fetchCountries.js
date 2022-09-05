import Notiflix from 'notiflix';
function fetchCountries(input) {
  return fetch(`https://restcountries.com/v2/name/${input}`).then(res => {
    console.log(res);
    return res.json();
  });
}

export { fetchCountries };
// export { showInfoNotification };
