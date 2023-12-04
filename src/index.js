import axios from 'axios';
import Notiflix from 'notiflix'; 

axios.defaults.headers.common['x-api-key'] =
  'live_0FP0Gszjw60zLKpHJ6bbQC8H0Yy15Gvh0VAj9K1BfL5ZXQgt0yOjUvqbBgMTYNLW';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

// Hide elements 
hideElement(loader);
hideElement(catInfo);
function fetchBreeds() {
    return axios.get('/breeds').then(({ data }) => data);
  }
  
  function fetchCatByBreed(breedID) {
    return axios.get(`/images/search?breed_ids=${breedID}`).then(({ data }) => data);
  }

fetchBreeds().then(data => {
  const html = data.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
  breedSelect.innerHTML = html;
});

breedSelect.addEventListener('change', handleBreedSelectChange);

function handleBreedSelectChange() {
  const selectedBreedId = breedSelect.value;

  // Reset
  resetUIElements();

  // Show loader
  showElement(loader);

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      // Show cat info
      showElement(catInfo);

      const { url, breeds } = catData[0];
      const breedInfo = breeds[0];

      catInfo.innerHTML = `
        <img src="${url}" alt="${breedInfo.name}"/>
        <p><b>Name:</b> ${breedInfo.name}</p>
        <p><b>Description:</b> ${breedInfo.description}</p>
        <p><b>Temperament:</b> ${breedInfo.temperament}</p>
      `;
    })
    .catch(error => {
      // Handle error
      handleRequestError(error);
    })
    .finally(() => {
      // Hide loader
      hideElement(loader);
    });
}

function resetUIElements() {
  hideElement(loader);
  hideElement(catInfo);
}

function showElement(element) {
  element.classList.remove('is-hidden');
}

function hideElement(element) {
  element.classList.add('is-hidden');
}

function handleRequestError(error) {
  Notiflix.Notify.failure('Oops! Something went wrong. Please try again later.');
  console.error(error);
}
