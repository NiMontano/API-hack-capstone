'use strict'
//goole info
const directionsApiKey = 'AIzaSyDL9SmrUA5cTAo0fzKulFXi-7dQ7fUY4p8'; 
const directionsURL = 'https://https://maps.googleapis.com/maps/api/directions/';

//yelp info

const yelpApiKey = 'Bearer fc4X_XRlPOIHhGAQdo7P2eNLkg4VBPGzI7bG_bXW7URTT7dmJQahyvZkccHCnrUMYO_aUUxFY3YPpYjoJ_VZn5jf2FRE45Aka86raLPBylFNIhv5kH14YY3P9XndX3Yx';
const yelpBusinessSearchURL = 'https://api.yelp.com/v3/businesses/search' 
/* reviews = yelpBusinessURL + {business} + /reviews*/

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);

  $('#results-list').empty();

  for (let i = 0; i < responseJson.data.length; i++){

    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3><br>
      ${responseJson.data[i].url}
      <p>${responseJson.data[i].description}</p>
      </li>`
    )};

  // display the results section  
  $('#results').removeClass('hidden');
};


function getBusinesses(query, searchTerm) {
  const inputLimit = $('#js-max-results').val();
  const inputRadius = $('#js-max-radius').val(); //add html element
  
  const params = {
    term: searchTerm,
    location: '',
    radius: inputRadius,
    limit: inputLimit
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  const options = {
      headers: new Headers({
          Authorization: yelpApiKey})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-business').val();
    const inputLimit = 10;
    const inputRadius = 10;
    getBusinesses(searchTerm, inputLimit);
  });
}

$(watchForm);