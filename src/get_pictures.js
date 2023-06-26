export default class NewGetPictures {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '37603582-92143e20137f7c1d3caa92753';

  query = null;
  page = 1;

  fetchPhotos() {
    return fetch(
      `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
        this.query
      }&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${
        this.page
      }`
    ).then(response => {
      if (!response.ok) {
        throw Error(response.status);
      }

      return response.json();
    });
  }
}
