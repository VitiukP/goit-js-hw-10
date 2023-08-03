import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';



const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

async function populateBreedsSelect() {
  try {
    const breeds = await fetchBreeds();
    breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
    breedSelect.removeAttribute('hidden');
    new SlimSelect({
      select: '.breed-select',
      showContent: "down",
    });
    loader.setAttribute('hidden', '');
  } catch (error) {
    loader.setAttribute('hidden', '');
    showError(error.message);
  }
}

function showError(errorMessage) {
  error.textContent = errorMessage;
  error.removeAttribute('hidden');
}

function hideError() {
  error.setAttribute('hidden', '');
}

async function displayCatInfo(breedId) {
  try {
    const catData = await fetchCatByBreed(breedId);
    const { url, breeds } = catData;
    const breedName = breeds[0].name;
    const description = breeds[0].description;
    const temperament = breeds[0].temperament;

    catInfo.innerHTML = `
      <img src="${url}" alt="${breedName}">
      <h2>${breedName}</h2>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
    `;
    catInfo.removeAttribute('hidden');

    Notiflix.Notify.success(`Information about ${breedName} found!`);
  } 
  catch (error) {
    showError(error.message);
  }
}

breedSelect.addEventListener('change', (event) => {
  const selectedBreedId = event.target.value;
  catInfo.setAttribute('hidden', '');
  displayCatInfo(selectedBreedId);
});

populateBreedsSelect();
