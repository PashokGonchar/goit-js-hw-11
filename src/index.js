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

let totalHits = 0;

const handleSearchFormSubmit = async event => {
  event.preventDefault();

  if (!inputEl.value.trim()) {
    return;
  }

  newGetPictures.query = inputEl.value;
  inputEl.value = '';
  galleryEl.innerHTML = '';
  newGetPictures.page = 1;

  const response = await newGetPictures.fetchPhotos();

  try {
    totalHits = response.totalHits;

    if (totalHits !== 0) {
      Notiflix.Notify.success(`"Hooray! We found ${totalHits} images."`);
    }

    if (response.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

      loadMoreBtnEl.classList.add('is-hidden');

      return;
    }

    galleryEl.innerHTML = createPicturesCard(response.hits);

    lightbox.refresh();

    if (newGetPictures.page * newGetPictures.perPage >= totalHits) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      loadMoreBtnEl.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
};

const handleLoadMore = async () => {
  newGetPictures.page += 1;

  const response = await newGetPictures.fetchPhotos();
  try {
    galleryEl.insertAdjacentHTML(
      'beforeend',
      createPicturesCard(response.hits)
    );

    if (newGetPictures.page * newGetPictures.perPage >= totalHits) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      loadMoreBtnEl.classList.remove('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
};

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

loadMoreBtnEl.addEventListener('click', handleLoadMore);

let lightbox = new SimpleLightbox('a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 200,
});
