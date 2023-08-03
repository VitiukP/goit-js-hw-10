import axios from "axios";

axios.defaults.headers.common["x-api-key"] =
    "live_gz9oBrIDOxSbfV6auru1158Y1wpb0wErN31Tjm5XN9NhJvTGHK95WxPdPGKKPuJG";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then((response) => response.data)
    .catch((error) => {
      throw new Error("Oops! Something went wrong! Try reloading the page!");
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => response.data[0])
    .catch((error) => {
      throw new Error("Failed to fetch cat by breed.");
    });
}
