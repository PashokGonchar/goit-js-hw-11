import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import NewGetPictures from './get_pictures';
import createPicturesCard from './templates/gallery-card.hbs';

const newGetPictures = new NewGetPictures();

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const inputEl = searchFormEl.firstElementChild;
const loadMoreBtnEl = document.querySelector('.btn-primary');

const handleSearchFormSubmit = event => {
  event.preventDefault();

  if (!inputEl.value.trim()) {
    return;
  }

  newGetPictures.query = inputEl.value;
  inputEl.value = '';
  galleryEl.innerHTML = '';

  newGetPictures
    .fetchPhotos()
    .then(data => {
      // console.log(data)
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );

        loadMoreBtnEl.classList.add('is-hidden');

        return;
      }

      galleryEl.innerHTML = createPicturesCard(data.hits);

      loadMoreBtnEl.classList.remove('is-hidden');
    })
    .catch(console.warn);
};

const handleLoadMore = () => {
  newGetPictures.page += 1;

  newGetPictures
    .fetchPhotos()
    .then(data => {
      // console.log(data.totalHits)
      // if (newGetPictures.page === data.totalHits) {
      //   loadMoreBtnEl.classList.add('is-hidden');
      // }
      galleryEl.insertAdjacentHTML('beforeend', createPicturesCard(data.hits));

      loadMoreBtnEl.classList.remove('is-hidden');
    })
    .catch(console.warn);
};

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

loadMoreBtnEl.addEventListener('click', handleLoadMore);
