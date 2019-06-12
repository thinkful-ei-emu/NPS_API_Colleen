/*https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=INSERT-API-KEY-HERE'
vhYwvxbazUrprudgZz0ytXmvDGNNOeYitXpB3f5I*/

'use strict'

/*use global, $ */

const apiKey = 'vhYwvxbazUrprudgZz0ytXmvDGNNOeYitXpB3f5I';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryItems(params){
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  
  for (let i= 0; i < responseJson.data.length-1; i++){

    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <a href=${responseJson.data[i].url}>Park Website</a>
      <p>${responseJson.data[i].description}</p>
      </li>` 
    );
  }
  $('#results').removeClass('hidden');
}

function getParkList(stateCode, limit=10){
  const params = {
    stateCode,
    limit,
    api_key: apiKey
  };
  const queryString = formatQueryItems(params);
  const url = searchUrl + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error (response.statusText);
    })
    .then (responseJson => displayResults(responseJson))
    .then(responseJson => console.log(JSON.stringify(responseJson)))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const stateCode = $('#js-state-search').val();
    const limit = $('#js-max-results').val();
    getParkList(stateCode, limit);
  });
}

$(watchForm);