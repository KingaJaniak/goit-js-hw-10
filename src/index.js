import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api'; 

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

// hide elements
hideElement(loader);
hideElement(catInfo);

fetchBreeds().then(data => {
  const html = data.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
  breedSelect.innerHTML = html;

  // hide loader
  hideElement(loader);
});

breedSelect.addEventListener('change', handleBreedSelectChange);

function handleBreedSelectChange() {
  const selectedBreedId = breedSelect.value;

  // reset
  resetUIElements();

  // show loader
  showElement(loader);

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      // show cat info
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
      // handle error
      handleRequestError(error);
    })
    .finally(() => {
      // hide loader 
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
