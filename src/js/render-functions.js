
import iziToast from 'izitoast'; 
import 'izitoast/dist/css/iziToast.min.css'; 

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { select } from '../main';

export function renderImg(arr) {
  function imgTemplate({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `<li class="gallery-item">
            <a class="gallery-link" href="${webformatURL}">
          <img loading="lazy" class="gallery-image" src="${largeImageURL}" alt="${tags}" />
        </a>
          <div class="image-info">
      <ul class="infoBlock">
      <li class="title">Likes</li>
      <li class="info">${likes}</li>
      </ul>
      <ul class="infoBlock">
      <li class="title">Views</li>
      <li class="info">${views}</li>
      </ul>
      <ul class="infoBlock">
      <li class="title">Comments</li>
      <li class="info">${comments}</li>
      </ul>
      <ul class="infoBlock">
      <li class="title">Downloads</li>
      <li class="info">${downloads}</li>
      </ul>
      </div>
    </li>`;
  }

  function imgsTemplate(arr) {
    return arr.map(imgTemplate).join('');
  }

  const markup = imgsTemplate(arr);
  select.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});