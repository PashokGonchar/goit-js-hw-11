import axios from 'axios';

export default class NewGetPictures {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '37603582-92143e20137f7c1d3caa92753';

  query = null;
  page = 1;
  perPage = 40;
  totalHits = 0;

    fetchPhotos() {
      return fetch(
        `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
          this.query
        }&image_type=photo&orientation=horizontal&safesearch=true&per_page=${
          this.perPage
        }&page=${this.page}`
      ).then(response => {
        if (!response.ok) {
          throw Error(response.status);
        }

        return response.json();
      });
    }
  }

  // fetchPhotos() {
  //   return axios.get(`${this.#BASE_URL}`, {
  //     params: {
  //       key: this.#API_KEY,
  //       q: this.query,
  //       image_type: photo,
  //       orientation: horizontal,
  //       safesearch: true,
  //       page: this.page,
  //       per_page: this.perPage,
  //     },
  //   });
  // }

