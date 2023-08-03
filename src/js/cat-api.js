import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_gz9oBrIDOxSbfV6auru1158Y1wpb0wErN31Tjm5XN9NhJvTGHK95WxPdPGKKPuJG';
const API_URL = 'https://api.thecatapi.com/v1/breeds';
const SEARCH_URL = `https://api.thecatapi.com/v1/images/search`;
function fetchBreeds() {
  return axios.get(API_URL);
}

function fetchCatByBreed(breedId) {
  return axios.get(`${SEARCH_URL}?breed_ids=${breedId}`);
}
export { fetchBreeds, fetchCatByBreed };
