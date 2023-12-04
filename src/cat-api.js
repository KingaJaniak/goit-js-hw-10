import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_0FP0Gszjw60zLKpHJ6bbQC8H0Yy15Gvh0VAj9K1BfL5ZXQgt0yOjUvqbBgMTYNLW';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get('/breeds').then(({ data }) => data);
}

export function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(({ data }) => data);
}
