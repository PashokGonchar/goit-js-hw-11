import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import NewGetPictures from './get_pictures';
import createPicturesCard from './templates/gallery-card.hbs'

const newGetPictures = new NewGetPictures();

const searchFormEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const handleSearchFormSubmit = event => {
  event.preventDefault();

  newGetPictures.fetchPhotos().then(data => {
    // console.log(data.hits)
    galleryEl.innerHTML = createPicturesCard(data.hits);
  });
};

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

