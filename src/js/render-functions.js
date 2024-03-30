
import iziToast from 'izitoast'; 
import 'izitoast/dist/css/iziToast.min.css'; 

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


export function renderGallery(images) {
  const gallery = document.querySelector('.gallery-img');
  gallery.innerHTML = ''; 

  if (images.length === 0) {
    iziToast.info({
      title: 'Info',
      color: 'red',
      position: 'topRight',
      message: 'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
  `<a href="${largeImageURL}" class="gallery-item" data-lightbox="gallery">
    <img src="${webformatURL}" alt="${tags}" />
    <div class="info">
      <p><strong>Likes:</strong> ${likes}</p>
      <p><strong>Views:</strong> ${views}</p>
      <p><strong>Comments:</strong> ${comments}</p>
      <p><strong>Downloads:</strong> ${downloads}</p>
    </div>
  </a>`).join('');
    
    gallery.innerHTML = markup;

    let lightbox = new SimpleLightbox('.gallery-item', { captionsData: 'alt', });
    lightbox.refresh();
}
